const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clan')
		.setDescription('Show the members of a clan')
    .addSubcommand(subcommand =>
      subcommand
        .setName('int')
        .setDescription('International server')
        .addStringOption(option =>
          option.setName('clan_name')
            .setDescription('Input clan name')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ru')
        .setDescription('Russian server')
        .addStringOption(option =>
          option.setName('clan_name')
            .setDescription('Input clan name')
            .setRequired(true))),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    const server = interaction.options.getSubcommand();
    const clan = interaction.options.getString('clan_name');

    const clanData = await fetch(`https://api.wfstats.cf/clan/members?name=${encodeURIComponent(clan)}&server=${server}`).then(res => res.json())
    if ('status' in clanData) return interaction.reply({content: `\`${ctx.clan_not_found.replace("{{CLAN_NAME}}",clan)}\``})   
    let cmdEmbed = new MessageEmbed()
      .setColor('#ff69b4')
      .setTitle("`" + clanData.name + "` - " + (clanData.members).length + "/50")
      .setURL(`https://wfstats.cf/clan?clan=${encodeURIComponent(clan)}&server=${server}`)
    let clanmembers = []
    clanData.members.forEach(function(elem) {
      clanmembers.push(elem.clan_points + utils.clanRole(elem.clan_role) + "`" + elem.nickname +"`" )
    })
    cmdEmbed.setDescription(clanmembers.join('\n'))
    return interaction.reply({embeds: [cmdEmbed]})       
  },
};