const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { RegisterFunction } = require('../../Functions/Tools/register');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('register')
    .setType(ApplicationCommandType.User),
    async execute(interaction, client){
        try{
            await RegisterFunction(interaction, client);
        } catch(err){
            return console.error(err);
        }
        
    },
};