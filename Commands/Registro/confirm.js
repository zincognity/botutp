const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('confirm')
    .setDescription('Confirmaré a un usuario.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a confirmar').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon de la confirmación').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        const user = interaction.options.getUser('target');
        const { guild } = interaction;
        let razon = interaction.options.getString('razon');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if(user.id === interaction.user.id) return interaction.reply({content: 'No puedes confirmarte a ti mismo.', ephemeral: true});
        if(user.id === client.user.id) return interaction.reply({content: 'No puedes confirmarme a mi.', ephemeral: true});
        if(member.roles.cache.has('1020836518509682828')) return interaction.reply({content: 'No puedes confirmar a alguien que ya tiene el rol verificado.', ephemeral: true});

        const canal = interaction.guild.channels.cache.get('1054294724741189642');

        try{
            let iddc = await registerSchema.findOne({ _id: user.id });

            if(!iddc){
                return interaction.reply({content: 'El usuario aún no se ha registrado para poder verificarlo.'});
            } else {
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                .setTitle(`${user.tag} ha sido verificado del servidor.`)
                .setColor('Green')
                .setTimestamp()
                .setFooter({ 
                    text: `Solicitado por: ${interaction.user.username}#${interaction.user.discriminator}`, 
                    iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` 
                })
                .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                .addFields(
                    { name: "ID de Discord", value: `${user.id}`},
                    { name: "Usuario", value: `${user.username}`},
                    { name: "Código Estudiantil", value: iddc['code']},
                    { name: "Razón", value: `${razon}`}
                );
                
                await member.roles.remove('1054229057304277042').catch(console.error);
                await member.roles.add('1020836518509682828').catch(console.error);
                canal.send({embeds: [embed]});

                return interaction.reply({content: `${user.tag} Ha sido confirmado. \nRazón: ${razon}`});
            }
        } catch(err){
            console.log(err);
            return interaction.reply({content: 'Ha ocurrido un error!'});
        };

    },
};