const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const Enmapdb = require('./enmapdb.js');

client.commands = new Collection();
client.langs = new Collection();
client.settings = Enmapdb.settings

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const langFiles = fs.readdirSync('./langs').filter(file => file.endsWith('.json'));
for (const file of langFiles) {
	const lang = require(`./langs/${file}`);
	client.langs.set(file.split(".")[0], lang);
}

client.getCMDLang = function(g,cmd){
  if (g){
    let l = client.settings.get(g, "language") ? client.settings.get(g, "language") : "en";
    return client.langs.get(l)[cmd];
  } 
  return client.langs.get('en')[cmd];
}

client.on('ready', async () => {
  console.log(`[${new Date()}]\nwfbot has started.\n    ${client.guilds.cache.size} servers\n    ${client.users.cache.size} users\n    ${client.channels.cache.size} channels\n`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

	if (!command) return;
  if (interaction.guildId) client.settings.ensure(interaction.guildId, config.defaultSettings);

	try {
		await command.execute(client,interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.bot_token);