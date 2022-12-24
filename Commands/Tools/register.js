const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { RegisterFunction } = require('../../Functions/register');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('register')
    .setType(ApplicationCommandType.User),
    async execute(interaction, client){
        RegisterFunction(interaction, client);
    },
};