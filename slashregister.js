const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
var Args = process.argv.slice(2);
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (command.public){
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(config.bot_token);
if(Args[0] == 'prod'){
	rest.put(Routes.applicationCommands(config.clientId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
} else if (Args[0] == 'dev'){
	rest.put(Routes.applicationGuildCommands(config.clientId,config.devServer), { body: commands },)
		.then(() => console.log('Successfully registered application commands in the dev server.'))
		.catch(console.error);
} else {
	console.log("Wrong argument supplied");
}
