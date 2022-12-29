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
        const canal = interaction.options.getChannel('canal');
        const { guild } = interaction;

        let mensaje = interaction.options.getString('mensaje');

        // const embed = new EmbedBuilder()
        // .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
        // .setTitle(`${user.tag} ha sido kickeado del servidor.`)
        // .setColor('Red')
        // .setTimestamp()
        // .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
        // .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        // .addFields({ name: `Razon`, value: `${razon}`})

        await canal.send({content: mensaje}).catch(console.error)
    },
};