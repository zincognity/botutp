const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Collector } = require('discord.js');
const { Collection } = require('mongoose');
const { db } = require('../../DataBase/registerSchema');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Te mostraré la información de un usuario en específico.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a doxxear').setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const { guild } = interaction;

        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        const usuario = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);

        if (user.id === client.user.id) return interaction.reply({content: 'No puedes confirmarme a mi.', ephemeral: true});
        if (!member.roles.cache.has('1020836518509682828')) return interaction.reply({content: 'El usuario no está verificado, por ende, no hay información sobre este.', ephemeral: true})

        try{

            let userid = await registerSchema.findOne({
                _id: user.id
            });

            let codec = userid['code'];

            let usercodec = await registerSchema.findOne({
                _id: user.id
            });

            let usernamesc = usercodec['nombres'];

            let carrerc = await registerSchema.findOne({
                _id: user.id
            });

            let usercarrerc = carrerc['carrera'];

            let sedec = await registerSchema.findOne({
                _id: user.id
            });

            let usersedec = sedec['sede'];

            let descripcionc = await registerSchema.findOne({
                _id: user.id
            });

            let userdescripcionc = descripcionc['description'];

            let infopublicc = await registerSchema.findOne({
                _id: user.id
            });

            let userinfopublic = infopublicc['public'];

            if (userinfopublic === true) userinfopublic = 'SI';
            if (userinfopublic === false) userinfopublic = 'NO';

            if(userinfopublic === 'SI'){
                if (user.id !== interaction.user.id) {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${user.tag}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setColor('Random')
                    .setTimestamp()
                    .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
                    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                    .addFields(
                        { name: "Usuario", value: `<@${user.id}>`},
                        { name: "ID", value: user.id},
                        { name: "Membresía en Discord", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`},
                        { name: `Membresía en UTP 9/10 jalan`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`},
                        { name: "Código Estudiantil", value: codec},
                        { name: "Nombres", value: usernamesc},
                        { name: "Carrera", value: usercarrerc},
                        { name: "Sede", value: usersedec},
                        { name: "Sobre mi", value: userdescripcionc},
                        { name: "Publico", value: userinfopublic.toString()},
                        { name: "Roles", value: member.roles.cache.map(r => r).join(', ')}
                    )
        
                    return interaction.reply({embeds: [embed]});
                } else if(user.id === interaction.user.id){
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${user.tag}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setColor('Random')
                    .setTimestamp()
                    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                    .addFields(
                        { name: "Usuario", value: `<@${user.id}>`},
                        { name: "ID", value: user.id},
                        { name: "Membresía en Discord", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`},
                        { name: `Membresía en UTP 9/10 jalan`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`},
                        { name: "Código Estudiantil", value: codec},
                        { name: "Nombres", value: usernamesc},
                        { name: "Carrera", value: usercarrerc},
                        { name: "Sede", value: usersedec},
                        { name: "Sobre mi", value: userdescripcionc},
                        { name: "Publico", value: userinfopublic.toString()},
                        { name: "Roles", value: member.roles.cache.map(r => r).join(', ')}
                    )
                    return interaction.reply({embeds: [embed]});
                }
            } else if (userinfopublic === 'NO'){
                if (usuario.id === '245702253971898379' || user.id === interaction.user.id){
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${user.tag}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setColor('Random')
                    .setTimestamp()
                    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                    .addFields(
                        { name: "Usuario", value: `<@${user.id}>`},
                        { name: "ID", value: user.id},
                        { name: "Membresía en Discord", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`},
                        { name: `Membresía en UTP 9/10 jalan`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`},
                        { name: "Código Estudiantil", value: codec},
                        { name: "Nombres", value: usernamesc},
                        { name: "Carrera", value: usercarrerc},
                        { name: "Sede", value: usersedec},
                        { name: "Sobre mi", value: userdescripcionc},
                        { name: "Publico", value: userinfopublic.toString()},
                        { name: "Roles", value: member.roles.cache.map(r => r).join(', ')}
                    )
                    return interaction.reply({embeds: [embed]});
                } else{
                    return interaction.reply({content: 'La información de este usuario es privada.'});
                }

            }

        }catch (err){
            console.log('El usuario aún no se ha registrado para poder verificarlo. Error');
            console.log(err);
            return interaction.reply({content: 'El usuario aún no se ha registrado para poder verificarlo.'});
        }
    }
};