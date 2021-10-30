const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const utils = require('../utils.js');

function getItemCurrency(item){
	let o = item.offers.pop();
	if (o.cry_price != 0) {
		return `${o.cry_price}${utils.currencyEmoji.k}`
	} else if (o.game_price != 0) {
		return `${o.game_price}${utils.currencyEmoji.wfd}`
	} else if (o.crown_price != 0) {
		return `${o.crown_price}${utils.currencyEmoji.crowns}`
	}
}

function validateShopDescription(s) {
  if (s === ""){
    return "No offers";
  }
  if (s.length > 2045) {
    let g = s.replace(new RegExp(utils.currencyEmoji.k, 'g'),"K")
      .replace(new RegExp(utils.currencyEmoji.wfd, 'g'),"$")
      .replace(new RegExp(utils.currencyEmoji.crowns, 'g'),"C")
    return g
  }
  return s;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('In-Game shop items')
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

    let shop = await fetch(`https://api.wfstats.cf/shop/${server}`).then(res => res.json())
    var shopNew = ""
    var shopHot = ""
    var shopDiscount = ""
    Object.keys(shop.items).forEach(function(key) {
      let item = shop.items[key]
      if (item.offer_status == "new") {
        shopNew += `${getItemCurrency(item)} ${item.name}\n`
      } else if (item.offer_status == "hot"){
        shopHot += `${getItemCurrency(item)} ${item.name}\n`
      } else if (item.offer_status == "sale"){
        shopDiscount += `${getItemCurrency(item)} ${item.name}\n`
      }
    })
    let newShopEmbed = new MessageEmbed()
        .setTitle(`:shopping_cart: ${ctx.new.toUpperCase()} :shopping_cart:`)
        .setURL('https://wfstats.cf/shop')
        .setColor('#52E7B7')
        .setDescription(validateShopDescription(shopNew))
      
    let hotShopEmbed = new MessageEmbed()
      .setTitle(`:shopping_cart: ${ctx.hot.toUpperCase()} :shopping_cart:`)
      .setURL('https://wfstats.cf/shop')
      .setColor('#52E7B7')
      .setDescription(validateShopDescription(shopHot))
    
    let discountShopEmbed = new MessageEmbed()
      .setTitle(`:shopping_cart: ${ctx.discount.toUpperCase()} :shopping_cart:`)
      .setURL('https://wfstats.cf/shop')
      .setColor('#52E7B7')
      .setDescription(validateShopDescription(shopDiscount))
  
    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('shop_new')
          .setLabel(ctx.new)
          .setStyle('PRIMARY')
          .setEmoji("🔹"),
        new MessageButton()
          .setCustomId('shop_hot')
          .setLabel(ctx.hot)
          .setStyle('DANGER')
          .setEmoji("🔥"),
          new MessageButton()
          .setCustomId('shop_discount')
          .setLabel(ctx.discount)
          .setStyle('SECONDARY')
          .setEmoji("🛒")
      );
    await interaction.reply({embeds: [newShopEmbed], components:[buttonRow]})   
    let msg = await interaction.fetchReply()

    const filter = (intr) => intr.customId.startsWith('shop_') && intr.user.id === interaction.user.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30_000 });
    
    collector.on('collect', async i => {
      await i.deferUpdate();
      let cmdEmbed
      if (i.customId == "shop_new") {
        cmdEmbed = newShopEmbed
      } else if (i.customId == "shop_hot") {
        cmdEmbed = hotShopEmbed
      } else {
        cmdEmbed = discountShopEmbed
      }
      await interaction.editReply({embeds: [cmdEmbed],components:[buttonRow]})
    });
    
    collector.on('end', async i => {
      await interaction.editReply({components:[]})
    });   
  },
};