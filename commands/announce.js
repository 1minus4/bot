const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const {
  MessageActionRow,
  MessageSelectMenu,
  Modal,
  TextInputComponent,
  SelectMenuInteraction,
} = require('discord.js');

// Command goes here!
module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announces a message to everyone in a certain channel!')
    .addStringOption((option) =>
      option
        .setName('channel')
        .setDescription('The input to echo back')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The input to echo back')
        .setRequired(true),
    ),
  async execute(interaction) {
    const message = interaction.options.getString('message')
    let channelId = interaction.options.getString('channel')

    // Splice the extras off
    if (channelId.startsWith('<#') && channelId.endsWith('>')) {
      channelId = channelId.slice(2,-1)
    }

    interaction.guild.channels.cache.get(channelId).send(message)

    await interaction.reply(`${channelId}`);
  },
};
