const { SlashCommandBuilder } = require('discord.js');
const { RegisterFunction } = require('../../Functions/Tools/register');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Te registrarás con tus datos para ser verificado'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        RegisterFunction(interaction, client);
    },
};

// <t:${parseInt(interaction.createdTimestamp / 1000)}:R></t:$>