const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Te respondere con Pong'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction){
        interaction.reply({ content: `Pong!`, ephemeral: true}).then(m => {
            m.interaction.editReply(`:incoming_envelope: Mi ping es: **${Date.now() - m.interaction.createdTimestamp} ms**. `);
        });
    },
};