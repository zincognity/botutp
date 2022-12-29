const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Enviaré un mensaje en un canal en específico')
    .addChannelOption((option) => option.setName('canal').setDescription('Canal específico').setRequired(true))
    .addStringOption((option) => option.setName('mensaje').setDescription('Mensaje a enviar').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        try{
            const canal = interaction.options.getChannel('canal');
            let mensaje = interaction.options.getString('mensaje');

            await interaction.reply({content: 'Mensaje enviado!'});
            return await canal.send({content: mensaje}).catch(console.error);
        } catch(err){
            interaction.reply({content: 'Oh no!, algo ha fallado'})
            return console.error(err);
        }
    },
};