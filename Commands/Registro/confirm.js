const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('confirm')
    .setDescription('Confirmaré a un usuario.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a banear').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon del baneo'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const { guild } = interaction;

        let razon = interaction.options.getString('razon');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!razon) razon = 'Sin razón'
        if (user.id === interaction.user.id) return interaction.reply({content: 'No puedes confirmarte a ti mismo.', ephemeral: true});
        if (user.id === client.user.id) return interaction.reply({content: 'No puedes confirmarme a mi.', ephemeral: true});
        if (member.roles.cache.has('1020836518509682828')) return interaction.reply({content: 'No puedes confirmar a alguien que ya tiene el rol verificado.', ephemeral: true})

        try{
            let iddc = await registerSchema.findOne({
                _id: user.id
            });
    
            const embed = new EmbedBuilder()
            .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || 'https://images-ext-1.discordapp.net/external/MGRkUKYCvg4wnHvuGN9ybPkrskregSvQm_25E8AjRas/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/769691141398331452/69b10bc3917257dc8c3cd5a9c91daf26.png'}`})
            .setTitle(`${user.tag} ha sido verificado del servidor.`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true }) || 'https://images-ext-1.discordapp.net/external/MGRkUKYCvg4wnHvuGN9ybPkrskregSvQm_25E8AjRas/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/769691141398331452/69b10bc3917257dc8c3cd5a9c91daf26.png'}`)
            .addFields(
                { name: "ID de Discord", value: user.id},
                { name: "Código Estudiantil", value: iddc['code']}
            )
            
            await member.roles.remove('1054229057304277042').catch(console.error)
            await member.roles.add('1020836518509682828').catch(console.error);
    
            return interaction.reply({embeds: [embed]});
        }catch{
            console.log('El usuario aún no se ha registrado para poder verificarlo.');
            return interaction.reply('El usuario aún no se ha registrado para poder verificarlo.');
        }

    },
};