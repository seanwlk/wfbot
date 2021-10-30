const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Parser = require('rss-parser');
const parser = new Parser();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Latest news from warface blog')
    .addStringOption((option) => option
      .setName('platform')
      .setDescription('Choose the platform')
      .addChoices([
        ['International', 'int'],
        ['Russia', 'ru'],
        ['Playstation', 'ps'],
        ['Xbox', 'xbox']
      ])
      .setRequired(true)
    ),
	public : true,
  endpointMap: {
    'int' : 'https://pc.warface.com/en/rss.xml',
    'ru' : 'https://ru.warface.com/rss.xml',
    'ps' : 'https://ps.warface.com/en/rss.xml',
    'xbox' : 'https://xbox.warface.com/en/rss.xml',
    'ns' : 'https://ns.warface.com/en/rss.xml'
  },
  async execute(client,interaction) {
    const platform = interaction.options.getString('platform');

    const feed = await parser.parseURL(this.endpointMap[platform]);      
    let cmdEmbed = new MessageEmbed()
      .setColor('#0080ff')
      .setTitle(`📰 LATEST NEWS 📰`)
    feed.items.slice(0, 5).forEach(item => {
      cmdEmbed.addField(item.title, `${item.contentSnippet}\n${item.link}\n`);
    });
    return  interaction.reply({embeds: [cmdEmbed]})
	},
};