const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pve')
		.setDescription('Show player pve statistics and completion rate')
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

    let playerData = await fetch(`https://api.wfstats.cf/player/pve?nickname=${encodeURIComponent(player)}&server=${server}`).then(res => res.json())
    if('status' in playerData){
      switch (playerData.msg) {
        case 'player_not_found':
          return interaction.reply({content: `\`${ctx.player_not_found.replace("{{PLAYER_NAME}}",player)}\``})
          break;
        case 'player_inactive':
          return interaction.reply({content: `\`${ctx.player_inactive.replace("{{PLAYER_NAME}}",player)}\``})
          break;
        case 'player_hidden':
          return interaction.reply({content: `\`${ctx.player_hidden.replace("{{PLAYER_NAME}}",player)}\``})
          break;
        default:
          return interaction.reply({content: `\`${ctx.unknown_error}\``})
          break;
      }
    }
    let cmdEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle("`" + playerData.nickname + "` - PVE completion rate")
      .setURL(`https://wfstats.cf/pve/?nickname=${playerData.nickname}&server=${server}`)
      .addField(ctx.coop, `${ctx.easy}: ${utils.fix(playerData.easymission.player_sessions_won)}/${utils.fix(playerData.easymission.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.normalmission.player_sessions_won)}/${utils.fix(playerData.normalmission.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.hardmission.player_sessions_won)}/${utils.fix(playerData.hardmission.player_sessions_lost)}`, true)
      .addField(ctx.survivalmission, `${ctx.won} ${utils.fix(playerData.survivalmission.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.survivalmission.player_sessions_lost)}`, true)
      .addField(ctx.campaignsection1, `${ctx.won} ${utils.fix(playerData.campaignsection1.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.campaignsection1.player_sessions_lost)}`, true)
      .addField(ctx.campaignsection2, `${ctx.won} ${utils.fix(playerData.campaignsection2.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.campaignsection2.player_sessions_lost)}`, true)
      .addField(ctx.campaignsection3, `${ctx.won} ${utils.fix(playerData.campaignsection3.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.campaignsection3.player_sessions_lost)}`, true)
      .addField(ctx.campaignsections, `${ctx.won} ${utils.fix(playerData.campaignsections.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.campaignsections.player_sessions_lost)}`, true)
      .addField(ctx.volcano, `${ctx.easy}: ${utils.fix(playerData.volcanoeasy.player_sessions_won)}/${utils.fix(playerData.volcanoeasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.volcanonormal.player_sessions_won)}/${utils.fix(playerData.volcanonormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.volcanohard.player_sessions_won)}/${utils.fix(playerData.volcanohard.player_sessions_lost)}
  ${ctx.nightmare}: ${utils.fix(playerData.volcanosurvival.player_sessions_won)}/${utils.fix(playerData.volcanosurvival.player_sessions_lost)}`, true)
      .addField(ctx.anubis, `${ctx.easy}: ${utils.fix(playerData.anubiseasy.player_sessions_won)}/${utils.fix(playerData.anubiseasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.anubisnormal.player_sessions_won)}/${utils.fix(playerData.anubisnormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.anubishard.player_sessions_won)}/${utils.fix(playerData.anubishard.player_sessions_lost)}`, true)
      .addField(ctx.blackout, `${ctx.easy}: ${utils.fix(playerData.anubiseasy2.player_sessions_won)}/${utils.fix(playerData.anubiseasy2.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.anubisnormal2.player_sessions_won)}/${utils.fix(playerData.anubisnormal2.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.anubishard2.player_sessions_won)}/${utils.fix(playerData.anubishard2.player_sessions_lost)}`, true)
      .addField(ctx.black_shark, `${ctx.easy}: ${utils.fix(playerData.zombietowereasy.player_sessions_won)}/${utils.fix(playerData.zombietowereasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.zombietowernormal.player_sessions_won)}/${utils.fix(playerData.zombietowernormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.zombietowerhard.player_sessions_won)}/${utils.fix(playerData.zombietowerhard.player_sessions_lost)}`, true)
      .addField(ctx.icebreaker, `${ctx.easy}: ${utils.fix(playerData.icebreakereasy.player_sessions_won)}/${utils.fix(playerData.icebreakereasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.icebreakernormal.player_sessions_won)}/${utils.fix(playerData.icebreakernormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.icebreakerhard.player_sessions_won)}/${utils.fix(playerData.icebreakerhard.player_sessions_lost)}`, true)
      .addField(ctx.chernobyl, `${ctx.easy}: ${utils.fix(playerData.chernobyleasy.player_sessions_won)}/${utils.fix(playerData.chernobyleasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.chernobylnormal.player_sessions_won)}/${utils.fix(playerData.chernobylnormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.chernobylhard.player_sessions_won)}/${utils.fix(playerData.chernobylhard.player_sessions_lost)}`, true)
      .addField(ctx.cyberhorde, `${ctx.easy}: ${utils.fix(playerData.zombieeasy.player_sessions_won)}/${utils.fix(playerData.zombieeasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.zombienormal.player_sessions_won)}/${utils.fix(playerData.zombienormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.zombiehard.player_sessions_won)}/${utils.fix(playerData.zombiehard.player_sessions_lost)}`, true)
      .addField(ctx.sunrise, `${ctx.easy}: ${utils.fix(playerData.japaneasy.player_sessions_won)}/${utils.fix(playerData.japaneasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.japannormal.player_sessions_won)}/${utils.fix(playerData.japannormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.japanhard.player_sessions_won)}/${utils.fix(playerData.japanhard.player_sessions_lost)}`, true)
      .addField(ctx.mars, `${ctx.easy}: ${utils.fix(playerData.marseasy.player_sessions_won)}/${utils.fix(playerData.marseasy.player_sessions_lost)}
  ${ctx.normal}: ${utils.fix(playerData.marsnormal.player_sessions_won)}/${utils.fix(playerData.marsnormal.player_sessions_lost)}
  ${ctx.hard}: ${utils.fix(playerData.marshard.player_sessions_won)}/${utils.fix(playerData.marshard.player_sessions_lost)}`, true)
      .addField(ctx.hydra, `${ctx.won} ${utils.fix(playerData.pve_arena.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.pve_arena.player_sessions_lost)}`, true)
      .addField(ctx.blackwood, `${ctx.won} ${utils.fix(playerData.blackwood.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.blackwood.player_sessions_lost)}`, true)
      .addField(ctx.swarm, `${ctx.won} ${utils.fix(playerData.swarm.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.swarm.player_sessions_lost)}`, true)
      .addField(ctx.heist, `${ctx.won} ${utils.fix(playerData.heist.player_sessions_won)}\n${ctx.lost} ${utils.fix(playerData.heist.player_sessions_lost)}`, true)
    return interaction.reply({embeds: [cmdEmbed]})
  },
};