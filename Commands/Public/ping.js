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
            m.interaction.editReply(`:incoming_envelope: Ping Mensajes: \`${Math.floor(Date.now() / 10000000000)} ms\`\ `);
        });
    },
};