const { SlashCommandBuilder } = require('discord.js');
const { RegisterFunction } = require('../../Functions/register');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Te registrarás con tus datos para ser verificado'),
    async execute(interaction, client){
        RegisterFunction(interaction, client);
    },
};

// <t:${parseInt(interaction.createdTimestamp / 1000)}:R></t:$>