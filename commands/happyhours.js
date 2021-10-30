const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('happyhours')
		.setDescription('Shows when the happy hours are for the different regions'),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    let cmdEmbed = new MessageEmbed()
    .setColor('#ffffff')
    .setTitle(ctx.title)
    .addField(ctx.region1, ctx.text1, false)
    .addField(ctx.region2, ctx.text2, false);
    return  interaction.reply({embeds: [cmdEmbed]})
	},
};