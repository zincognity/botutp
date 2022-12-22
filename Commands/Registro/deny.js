const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, RoleSelectMenuInteraction, ModalBuilder, ActionRowBuilder, TextInputComponent, TextInputBuilder, TextInputStyle, ModalSubmitFields, ModalSubmitInteraction } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deny')
    .setDescription('Denegarás los datos de un usuario.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a denegar').setRequired(true))
    .addStringOption((option) => option.setName('razon').setDescription('Razon de la negación'))
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
        // if (user.id === interaction.user.id) return interaction.reply({content: 'No puedes denegarte a ti mismo.', ephemeral: true});
        if (user.id === client.user.id) return interaction.reply({content: 'No puedes denegarme a mi.', ephemeral: true});

        const canal = interaction.guild.channels.cache.get('1054294724741189642');

        try{
            let iddc = await registerSchema.findOne({
                _id: user.id
            });

            if(!iddc){
                return interaction.reply({content: 'No puedes denegar a un usuario que aún no se ha registrado!'});
            } else{
                registerSchema.deleteOne({
                    _id: user.id
                });

                return interaction.reply({content: 'Los datos han sido eliminados correctamente.'});
            }
        } catch (err){
            console.log(err);
        }


    }
};