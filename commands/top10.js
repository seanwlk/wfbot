const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top10')
		.setDescription('Top 10 Clan Monthly ladder')
    .addSubcommand(subcommand =>
      subcommand
        .setName('int')
        .setDescription('International server'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ru')
        .setDescription('Russian server')),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    const server = interaction.options.getSubcommand();

    let clans = await fetch(`https://api.wfstats.cf/top10/${server}`).then(res => res.json())
    let clanList = ""
    clans.forEach(function(clan) {
      clanList += `[${clan.clan}](https://wfstats.cf/clan/?clan=${encodeURIComponent(clan.clan)}&server=${server})` + " - `" + clan.clan_leader + "` - " + `${clan.points} \n`
    })
    let cmdEmbed = new MessageEmbed()
      .setTitle(`\`${ctx.title.replace("{{SERVER}}",server.toUpperCase())}\``)
      .setColor('#8034eb')
      .setDescription(`**${ctx.clan}**\t**${ctx.master}**\t**${ctx.points}**\n${clanList}`)
    return interaction.reply({embeds: [cmdEmbed]})      
  },
};