const { SlashCommandBuilder } = require('@discordjs/builders');

// Command goes here!
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gnome')
		.setDescription('Mysterious!'),
	async execute(interaction) {
    await interaction.reply('GET GNOMED NERD!!!')
	},
};
