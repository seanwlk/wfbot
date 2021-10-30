const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('List public DNS of Warface servers to ping'),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    let cmdEmbed = new MessageEmbed()
      .setTitle(ctx.title)
      .setDescription("```markdown\n" + ctx.text + " ```")
    return  interaction.reply({embeds: [cmdEmbed]})
	},
};