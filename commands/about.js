const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About bot description'),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    let cmdEmbed = new MessageEmbed()
      .setTitle(ctx.title)
      .setColor('#836FFF')
      .addField(ctx.purpose_t, ctx.purpose_p, false)
      .addField(ctx.utilities_t, ctx.utilities_p, false)
      .addField(ctx.credits_t, ctx.credits_p, false)
      .addField(ctx.feedback_t, ctx.feedback_p, false)
      .addField(ctx.add_t, ctx.add_p, false)
      .addField(ctx.donate_t, ctx.donate_p.replace("{{CURRENT_GUILDS}}",client.guilds.cache.size), false)
    return  interaction.reply({embeds: [cmdEmbed]})
	},
};