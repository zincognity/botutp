const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Daré TimeOut a un usuario en específico.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a dar TimeOut').setRequired(true))
    .addIntegerOption((option) => option.setName('tiempo').setDescription('Tiempo del TimeOut en minutos').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon del TimeOut'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const tiempo = interaction.options.getInteger('tiempo')
        const { guild } = interaction;

        let razon = interaction.options.getString('razon');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
    if (!razon) razon = 'Sin razón'
    if (user.id === interaction.user.id) return interaction.reply({content: 'No puedes darte TimeOut a ti mismo.', ephemeral: true});
    if (user.id === client.user.id) return interaction.reply({content: 'No puedes darme TimeOut a mi.', ephemeral: true});
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'No puedes dar TimeOut a alguien con un rol igual o superior al tuyo.', ephemeral: true})
    if (!member.kickable) return interaction.reply({content: 'No puedo banear a alguien con un rol superior al mío', ephemeral: true});
    if (tiempo > 10000) return interaction.reply({content: 'El tiempo no puede superar los 10.000 minutos', ephemeral:true});

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || 'https://images-ext-1.discordapp.net/external/MGRkUKYCvg4wnHvuGN9ybPkrskregSvQm_25E8AjRas/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/769691141398331452/69b10bc3917257dc8c3cd5a9c91daf26.png'}`})
    .setTitle(`${user.tag} ha sido TimeOuteado en el servidor.`)
    .setColor('Random')
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true }) || 'https://images-ext-1.discordapp.net/external/MGRkUKYCvg4wnHvuGN9ybPkrskregSvQm_25E8AjRas/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/769691141398331452/69b10bc3917257dc8c3cd5a9c91daf26.png'}`)
    .addFields({ name: `Razon`, value: `${razon}`, inline: true}, {name: 'Tiempo', value: `${tiempo} minutos`, inline: true});

    await member.timeout(tiempo * 60 * 1000, razon).catch(console.error);

    interaction.reply({embeds: [embed]});

    },
};