const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows current number of online players'),
	public : true,
  async execute(client,interaction) {
    let statsInt = await fetch(`https://api.wfstats.cf/stats/int`).then(res => res.json())
    let statsRu = await fetch(`https://api.wfstats.cf/stats/ru`).then(res => res.json())
    let statsArray = [statsInt,statsRu]
    let fieldStrings = []
    statsArray.forEach(function(stats, i){
      if (stats && !('status' in stats)) {
        let pvp = 0
        let pve = 0
        Object.keys(stats).forEach(function(key) {
          if (key.startsWith('pvp')) pvp += stats[key]
          else if (key.startsWith('pve')) pve += stats[key]
        })
        fieldStrings[i] = `<:pvp:552579327125094415> PVP: ${pvp}\n<:pve:552585213062938627> PVE: ${pve}\nTotal: ${pvp+pve}`;
      } else {
        fieldStrings[i] = "An error occured retriving stats.";
      }
    })
    let cmdEmbed = new MessageEmbed()
      .setTitle(":chart_with_upwards_trend: Warface current Online players :chart_with_upwards_trend:")
      .setURL('https://wfstats.cf/online')
      .setColor('#ffff00')
      .addField("International", fieldStrings[0])
      .addField("Russia", fieldStrings[1])
    return interaction.reply({embeds: [cmdEmbed]})
  },
};