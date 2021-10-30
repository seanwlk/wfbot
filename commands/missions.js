const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('missions')
		.setDescription('Crown challenge missions detailed time and score')
    .addSubcommand(subcommand =>
      subcommand
        .setName('int')
        .setDescription('International server'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ru')
        .setDescription('Russian server'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('specops')
        .setDescription('Special operations details')),
	public : true,
  async execute(client,interaction) {
    const param = interaction.options.getSubcommand();

    fetch(`https://api.wfstats.cf/crownchallenge/${param}`)
      .then(res => res.json())
      .then(missions => {
        let cmdEmbed = new MessageEmbed()
        .setTitle(`:crown: Crown Challenge ${param} :crown:`)
        .setURL("https://wfstats.cf/CrownChallenge/")
        .setColor('#ffff00')
      let missionsString = "";
      missions.forEach(function(m){
        missionsString += `-${m.level} | ${m.time.gold} | ${m.score.gold}\n`;
      })
      cmdEmbed.setDescription(missionsString);
      
      return interaction.reply({embeds: [cmdEmbed]})
    })      
  },
};