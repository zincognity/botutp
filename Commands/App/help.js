const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { HelpFuntion } = require('../../Functions/Tools/help');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('help')
    .setType(ApplicationCommandType.User),
    async execute(interaction, client){
        try{
            await HelpFuntion(interaction, client);
        } catch(err){
            return console.error(err);
        }
    },
};