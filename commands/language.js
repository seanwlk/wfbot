const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('language')
		.setDescription('Set commands language for this server')
    .addStringOption((option) => option
      .setName('lang')
      .setDescription('Choose the language')
      .addChoices([
        ['English', 'en'],
        ['German', 'de'],
        ['French', 'fr'],
        ['Russian', 'ru'],
        ['Portuguese', 'br'],
        ['Spanish', 'esp'],
        ['Finnish', 'fin'],
        ['Hungarian', 'hu']
      ])
      .setRequired(true)
    ),
	public : true,
  async execute(client,interaction) {
    const lang = interaction.options.getString('lang');
    if (interaction.memberPermissions.has('ADMINISTRATOR')){
      client.settings.set(interaction.guildId, lang, "language")
      return interaction.reply({content: inlineCode(`This server's language was set to: ${lang}`)})
    }
    return interaction.reply({content: inlineCode(`You have no permissions to change the language for this server`), ephemeral:true})
	},
};