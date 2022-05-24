const { SlashCommandBuilder } = require('@discordjs/builders');

// Command goes here!
module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announces a message to everyone in a certian channel!')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The input to echo back')
        .setRequired(true)),
	async execute(interaction) {
    await interaction.reply(interaction.options.getStringOption("message"))
  },
};
