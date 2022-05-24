// Data Needed
const { token } = require('./config.json');

// Modules
const fs = require('fs');
const path = require('node:path');
const { Client, Intents, Collection } = require('discord.js');

// Variables
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Bot Settings
client.commands = new Collection();

// Dynamic commands
const commandPath = path.join(__dirname, '/commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

// When the bot logs in to discord
client.on('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Client login to discord code
client.login(process.env['BOTTOKEN']);
