const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deny')
    .setDescription('Denegarás los datos de un usuario.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a denegar').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon de la negación').setRequired(true))
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

        if(user.id === interaction.user.id) return interaction.reply({content: 'No puedes denegarte a ti mismo.', ephemeral: true});
        if(user.id === client.user.id) return interaction.reply({content: 'No puedes denegarme a mi.', ephemeral: true});

        const canal = interaction.guild.channels.cache.get('1054294724741189642');

        try{
            let iddc = await registerSchema.findOne({ _id: user.id });

            if(!iddc){
                return interaction.reply({content: 'No puedes denegar a un usuario que aún no se ha registrado!'});
            } else{

                const borrarRegistro = async () => {
                    const resultado = await registerSchema.deleteOne({ _id: user.id });
                    console.log('****Resultado del usuario eliminado****', resultado)
                };

                borrarRegistro();

                const embeddeny = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                .setTitle(`${member.displayName} ha sido denegado!`)
                .setColor('DarkButNotBlack')
                .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`)
                .setTimestamp()
                .addFields(
                    { name: "ID", value: member.id},
                    { name: "Usuario", value: member.displayName},
                    { name: "Razón", value: `${razon}`}
                )
                .setFooter({ 
                    text: `Solicitado por: ${interaction.user.username}#${interaction.user.discriminator}`,
                    iconURL: interaction.user.displayAvatarURL()
                });
                canal.send({embeds: [embeddeny]});
                await member.roles.remove('1020836518509682828').catch(console.error);
                return interaction.reply({content: `${user.tag} Ha sido denegado. \nRazón: ${razon}`});
            }
        } catch(err){
            console.log(err);
            return interaction.reply({content: 'Ha ocurrido un error!'});
        };


    },
};