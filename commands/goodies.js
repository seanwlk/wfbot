const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goodies')
		.setDescription('Useful material'),
	public : true,
  async execute(client,interaction) {
    const ctx = client.getCMDLang(interaction.guildId,this.data.name);
    let cmdEmbed = new MessageEmbed()
      .setColor('#D16619')
      .setTitle(ctx.title)
      .addField("WFCompare", "http://wfcompare.cf", false)
      .addField("WFStats", "http://wfstats.cf", false)
      .addField(ctx.wiki.title, ctx.wiki.url, false)
      .addField(ctx.ongoing_events.title, ctx.ongoing_events.url, false)
      .addField(ctx.specops_rewards.title, ctx.specops_rewards.url, false)
      .addField(ctx.achievements.title, ctx.achievements.url, false)
      .addField(ctx.inventory.title, ctx.inventory.url, false)
      .addField(ctx.myitems.title, ctx.myitems.url, false)
      .addField(ctx.support.title, ctx.support.url, false)
    return  interaction.reply({embeds: [cmdEmbed]})
	},
};