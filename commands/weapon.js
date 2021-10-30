const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder, inlineCode, bold } = require('@discordjs/builders');
const fetch = require('node-fetch');

function getWFComparetHash(wpnid){
  var wpnHash;
  if (wpnid.startsWith("ar")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","0","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("mg")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","1","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("shg")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","2","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("smg")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","3","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("sr")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","4","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("pt")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","6","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("kn")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","7","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("hmg")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","5","${wpnid}","0","0","0"]`).toString('base64')
  else if (wpnid.startsWith("arl")) wpnHash = Buffer.from(`[1,1,0,1,0,0,1,"1","8","${wpnid}","0","0","0"]`).toString('base64')
  else wpnHash = ""
  return wpnHash
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weapon')
		.setDescription('Shows current number of online players')
    .addStringOption(option =>
      option.setName('search')
        .setDescription('Search for a weapon by its name')
        .setRequired(true)),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    const searchString = interaction.options.getString('search');
    const weaponSearch = await fetch(`https://api.wfstats.cf/weapons?search=${encodeURIComponent(searchString)}`).then(res => res.json())
    if (weaponSearch.length === 0) return interaction.reply(inlineCode(ctx.no_results))
    if (weaponSearch.length > 25) return interaction.reply(inlineCode(ctx.too_many_results))
    let options = []
    weaponSearch.forEach(element => {
      options.push({label:element.name,value:element.id})
    });

    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('weaponselect')
					.setPlaceholder('Nothing selected')
					.addOptions(options),
			);

    await interaction.reply({content: inlineCode(ctx.instructions), components : [row]})
    let msg = await interaction.fetchReply()

    const filter = (intr) => intr.customId === 'weaponselect' && intr.user.id === interaction.user.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30_000 });
    
    collector.on('collect', async i => {
      const weaponData = await fetch(`https://api.wfstats.cf/weapons?weapon_id=${i.values[0]}`).then(res => res.json())
      var cmdEmbed = new MessageEmbed()
        .setTitle(`${weaponData.name}`)
        .setColor('#C15E84')
        .setURL(`https://wfcompare.cf/#${getWFComparetHash(weaponData.id)}`)
        .setImage(`https://wf.cdn.gmru.net/static/wf.mail.ru/img/main/items/${weaponData.id}_shop.png`)
        .setFooter(`${weaponData.id}`)
        .addField(ctx.fire_params,`${ctx.damage} ${weaponData.stats.params.damage}\n${ctx.rpm} ${weaponData.stats.params.rpm}\n${ctx.range} ${weaponData.stats.params.damage_drop_min_distance}\n${ctx.min_dmg} ${weaponData.stats.params.damage_min}\n${ctx.dmg_drop} ${weaponData.stats.params.damage_drop_per_meter}`,true)
        .addField(ctx.other,`${ctx.mag} ${weaponData.stats.params.ammo_amount}\n${ctx.extra_ammo} ${weaponData.stats.fireparams.extra_ammo}\n${ctx.reload_duration} ${weaponData.stats.params.reload_duration}\n${ctx.select_duration} ${weaponData.stats.params.select_duration}ms\n${ctx.deselect_duration} ${weaponData.stats.params.deselect_duration}\n${ctx.melee_damage} ${weaponData.stats.params.melee_damage}`,true)
        .addField(ctx.multipliers,`${ctx.head} ${weaponData.stats.multipliers.head_damage_mult} \n${ctx.chest} ${weaponData.stats.multipliers.body_damage_mult} \n${ctx.arms} ${weaponData.stats.multipliers.arms_damage_mult} \n${ctx.legs} ${weaponData.stats.multipliers.legs_damage_mult}`,true)
      await interaction.editReply({content: bold("Weapon Stats"), embeds: [cmdEmbed],components:[]})
      collector.stop("wpn_selected")
    });
    
    collector.on('end', async (i, reason) => {
      if(reason != "wpn_selected"){
        await interaction.editReply({content: inlineCode(ctx.replytimeout),components:[]})
      }
    });
  },
};