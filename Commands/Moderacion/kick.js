const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kickeare a un usuario en específico.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a kickear').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon del kickeo').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        const user = interaction.options.getUser('target');
        const { guild } = interaction;

        let razon = interaction.options.getString('razon');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if(user.id === interaction.user.id) return interaction.reply({content: 'No puedes kickearte a ti mismo.', ephemeral: true});
        if(user.id === client.user.id) return interaction.reply({content: 'No puedes kickearme a mi.', ephemeral: true});
        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'No puedes kickear a alguien con un rol igual o superior al tuyo.', ephemeral: true});
        if(!member.kickable) return interaction.reply({content: 'No puedo kickear a alguien con un rol superior al mío', ephemeral: true});

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
        .setTitle(`${user.tag} ha sido kickeado del servidor.`)
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .addFields({ name: `Razon`, value: `${razon}`});

        await member.kick(razon).catch(console.error);
        interaction.reply({embeds: [embed]});
    },
};