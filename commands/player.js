const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('player')
		.setDescription('Show player statistics')
    .addSubcommand(subcommand =>
      subcommand
        .setName('int')
        .setDescription('International server')
        .addStringOption(option =>
          option.setName('player_name')
            .setDescription('Input player name')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ru')
        .setDescription('Russian server')
        .addStringOption(option =>
          option.setName('player_name')
            .setDescription('Input player name')
            .setRequired(true))),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    const server = interaction.options.getSubcommand();
    const player = interaction.options.getString('player_name');

    let playerData = await fetch(`https://api.wfstats.cf/player/stats?nickname=${encodeURIComponent(player)}&server=${server}`).then(res => res.json())
    if('status' in playerData){
      switch (playerData.msg) {
        case 'player_not_found':
          return interaction.reply({content: `\`${ctx.player_not_found.replace("{{PLAYER_NAME}}",player)}\``})
          break;
        case 'player_inactive':
          return interaction.reply({content: `\`${ctx.player_inactive.replace("{{PLAYER_NAME}}",player)}\``})
          break;
        case 'player_hidden':
          let playerData = await fetch(`https://api.wfstats.cf/playerInfo?nickname=${encodeURIComponent(player)}&server=${server}`).then(res => res.json())
          if ("status" in playerData) return interaction.reply({content: `\`${ctx.player_hidden.replace("{{PLAYER_NAME}}",player)}\``})
          let cmdEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`\`${playerData.nickname}\` - ${ctx.title}`)
            .addField(ctx.rank, `${playerData.rank}`, true)
            .addField(ctx.clan, `${(playerData.clan_name == "" ) ? ctx.no_clan : "[`"+playerData.clan_name+"`](https://wfstats.cf/clan/?clan="+String(playerData.clan_name).replace(")","%29")+"&server="+utils.apiMap[server].wfstats+")"}\n${(playerData.clan_name == "" ) ? "" : ctx.joined+playerData.clan_member_since}`, true)
            .addField(ctx.playtime, `${playerData.playtime_h} ${ctx.hours}`, true)
            .addField(`PVP`, `${ctx.fav_class} ${utils.classToEmoji[playerData.favorite_pvp_class]}`, false)
            .addField(`KD`, playerData.pvp, true)
            .addField(ctx.kills, `${ctx.total} ${playerData.pvp_kills}\n${ctx.deaths} ${playerData.pvp_deaths}`, true)
            .addField(ctx.games, `${ctx.total} ${playerData.pvp_total_matches}\n${ctx.won} ${playerData.pvp_wins}\n${ctx.lost} ${playerData.pvp_loses}`, true)
            .addField(ctx.more, `W/L Ratio: ${playerData.pvpwl}\nRanked rank: ${playerData.pvp_rating_rank}\n${ctx.matches_left} ${playerData.leavings_percentage}%`, true)
            .addField(`PVE`, `${ctx.fav_class} ${utils.classToEmoji[playerData.favorite_pve_class]}`, false)
            .addField(`Missions completed`,`${playerData.missions_completed}`, true)
            .addField(ctx.more,`${ctx.climb_coops} ${playerData.coop_climbs_performed}\n${ctx.climb_assist} ${playerData.coop_assists_performed}`, true)
            .addField(`Misc`,`Clan role: ${playerData.clan_role}\nClan points: ${playerData.clan_points}\nItems unlocked: ${playerData.items_unlocked}\nAchievements: ${playerData.challenges_completed}\nRanked level ${playerData.pvp_rating_rank}`, false)
          return interaction.reply({embeds: [cmdEmbed]})
          break;
        default:
          return interaction.reply({content: `\`${ctx.unknown_error}\``})
          break;
      }
    }
    let cmdEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle(`\`${playerData.nickname}\` - ${ctx.title}`)
      .setURL(`https://wfstats.cf/?nickname=${playerData.nickname}&server=${server}`)
      .addField(ctx.rank, `${playerData.rank_id}`, true)
      .addField(ctx.clan, `${(playerData.clan_name === undefined ) ? ctx.no_clan : `[\`${playerData.clan_name}\`](https://wfstats.cf/clan/?clan=${encodeURIComponent(playerData.clan_name)}&server=${server})`}`, true)
      .addField(ctx.playtime, `${playerData.playtime_h} ${ctx.hours}`, true)
      .addField(`PVP`, `${ctx.fav_class} ${utils.classToEmoji[playerData.favoritPVP]}`, false)
      .addField(`KD`, `${playerData.pvp}`, true)
      .addField(ctx.kills, `${ctx.total} ${playerData.kills}
${ctx.friendly_kills} ${playerData.friendly_kills}
${ctx.deaths} ${playerData.death}`, true)
      .addField(ctx.headshots, `${ctx.rifle} ${utils.fix(playerData.class.Rifleman.PVP.player_headshots)}
${ctx.medic} ${utils.fix(playerData.class.Medic.PVP.player_headshots)}
${ctx.engi} ${utils.fix(playerData.class.Engineer.PVP.player_headshots)}
${ctx.sniper} ${utils.fix(playerData.class.Recon.PVP.player_headshots)}
${ctx.sed} ${utils.fix(playerData.class.Heavy.PVP.player_headshots)}`, true)
      .addField(ctx.games, `${ctx.total} ${parseInt(playerData.mode.PVP.player_sessions_won) + parseInt(playerData.mode.PVP.player_sessions_lost)}
${ctx.won} ${utils.fix(playerData.mode.PVP.player_sessions_won)}
${ctx.lost} ${utils.fix(playerData.mode.PVP.player_sessions_lost)}`, true)
      .addField(ctx.more, `${ctx.matches_left} ${utils.fix(playerData.mode.PVP.player_sessions_left)}
${ctx.kicked} ${utils.fix(playerData.mode.PVP.player_sessions_kicked)}
${ctx.draws} ${utils.fix(playerData.mode.PVP.player_sessions_draw)}
${ctx.melee} ${utils.fix(playerData.mode.PVP.player_kills_melee)}`, true)
      .addField(`PVE`, `${ctx.fav_class} ${utils.classToEmoji[playerData.favoritPVE]}`, false)
      .addField(`KD`, `${playerData.pve}`, true)
      .addField(ctx.kills, `${ctx.total} ${playerData.pve_kills}
${ctx.friendly_kills} ${utils.fix(playerData.pve_friendly_kills)}
${ctx.deaths} ${utils.fix(playerData.pve_death)}`, true)
      .addField(ctx.headshots, `${ctx.rifle} ${utils.fix(playerData.class.Rifleman.PVE.player_headshots)}
${ctx.medic} ${utils.fix(playerData.class.Medic.PVE.player_headshots)}
${ctx.engi} ${utils.fix(playerData.class.Engineer.PVE.player_headshots)}
${ctx.sniper} ${utils.fix(playerData.class.Recon.PVE.player_headshots)}
${ctx.sed} ${utils.fix(playerData.class.Heavy.PVE.player_headshots)}`, true)
      .addField(ctx.games, `${ctx.total} ${parseInt(playerData.pve_wins) + parseInt(playerData.pve_lost)}
${ctx.won} ${utils.fix(playerData.pve_wins)}\n${ctx.lost} ${utils.fix(playerData.pve_lost)}`, true)
      .addField(ctx.more, `${ctx.coins_used} ${utils.fix(playerData.stat.player_resurrected_by_coin)}
${ctx.matches_left} ${utils.fix(playerData.mode.PVE.player_sessions_left)}
${ctx.melee} ${utils.fix(playerData.mode.PVE.player_kills_melee)}`, true)
      .addField(ctx.shared, `${ctx.damage} ${utils.fix(playerData.stat.player_damage)}
${ctx.climb_assist} ${utils.fix(playerData.stat.player_climb_assists)}
${ctx.climb_coops} ${utils.fix(playerData.stat.player_climb_coops)}
${ctx.ammo_restored} ${utils.fix(playerData.stat.player_ammo_restored)}
${ctx.revives} ${utils.fix(playerData.stat.player_resurrect_made)}
${ctx.health_restored} ${utils.fix(playerData.stat.player_heal)}
${ctx.armor_restored} ${utils.fix(playerData.stat.player_repair)}
${ctx.revived_by_med} ${utils.fix(playerData.stat.player_resurrected_by_medic)}`, false)
    
    if ('is_transparent' in playerData && playerData.is_transparent == false) {
      cmdEmbed.addField(`Account Suspended`, "Looks like the account was suspended for cheating.", true)
      cmdEmbed.setColor('#FF0000')
    }

    return interaction.reply({embeds: [cmdEmbed]})
  },
};