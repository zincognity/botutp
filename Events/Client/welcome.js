const { ChatInputCommandInteraction, ActionRow, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    execute(member, client){
        try{
            console.log(`guildMemberAdd: ${member}`);
        } catch (err) {
            return console.log(err);
        }
    }
}