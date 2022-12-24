const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Collection } = require('mongoose');
const { db } = require('../../DataBase/registerSchema');
const { collectInfo } = require('../../Functions/data/collectiInfo');
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
    async execute(interaction, client){
        const user = interaction.options.getUser('target');
        const { guild } = interaction;
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
        const usuario = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);

        if(user.id === client.user.id) return interaction.reply({content: 'No puedes confirmarme a mi.', ephemeral: true});
        if(!member.roles.cache.has('1020836518509682828')) return interaction.reply({content: 'El usuario no está verificado, por ende, no hay información sobre este.', ephemeral: true});

        try{
            let userid = await registerSchema.findOne({ _id: user.id });

            if(!userid){
                return interaction.reply({content: `El usuario ${user.username}#${user.discriminator} aún no se ha registrado!`});
            } else{
                let userinfopublic = collectInfo(user.id, 'public');
                
                if(userinfopublic === true) userinfopublic = 'SI';
                if(userinfopublic === false) userinfopublic = 'NO';

                let buscarcode = 'code';
                let buscarnombres = 'nombres';
                let buscarcarrera = 'carrera';
                let buscarsede = 'sede';
                let buscardescription = 'description';
    
                if(userinfopublic === 'SI'){
                    if(user.id !== interaction.user.id){
                        const embed = new EmbedBuilder()
                        .setTitle('Datos del Estudiante')
                        .setColor('LightGrey')
                        .setTimestamp()
                        .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
                        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            { name: "Usuario:", value: `<@${user.id}>`},
                            { name: "ID:", value: user.id},
                            { name: "Membresía en Discord:", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: `Membresía en el servidor:`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: "Código Estudiantil:", value: collectInfo(user.id, buscarcode), inline: true},
                            { name: "Nombres:", value: collectInfo(user.id, buscarnombres), inline: true},
                            { name: "Carrera:", value: collectInfo(user.id, buscarcarrera), inline: true},
                            { name: "Sede:", value: collectInfo(user.id, buscarsede), inline: true},
                            { name: "Sobre mi:", value: collectInfo(user.id, buscardescription), inline: false},
                            { name: "Publico:", value: userinfopublic, inline: true},
                            { name: "Roles:", value: member.roles.cache.map(r => r).join(', '), inline: true}
                        );
                        return await interaction.reply({embeds: [embed]});
                    } else if(user.id === interaction.user.id){
                        const embed = new EmbedBuilder()
                        .setTitle('Datos del Estudiante')
                        .setColor('LightGrey')
                        .setTimestamp()
                        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            { name: "Usuario:", value: `<@${user.id}>`},
                            { name: "ID:", value: user.id},
                            { name: "Membresía en Discord:", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: `Membresía en el servidor:`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: "Código Estudiantil:", value: collectInfo(user.id, buscarcode), inline: true},
                            { name: "Nombres:", value: collectInfo(user.id, buscarnombres), inline: true},
                            { name: "Carrera:", value: collectInfo(user.id, buscarcarrera), inline: true},
                            { name: "Sede:", value: collectInfo(user.id, buscarsede), inline: true},
                            { name: "Sobre mi:", value: collectInfo(user.id, buscardescription), inline: false},
                            { name: "Publico:", value: userinfopublic.toString(), inline: true},
                            { name: "Roles:", value: member.roles.cache.map(r => r).join(', '), inline: true}
                        );
                        return await interaction.reply({embeds: [embed]});
                    };
                } else if(userinfopublic === 'NO'){
                    if(usuario.id === '245702253971898379' || user.id === interaction.user.id){
                        const embed = new EmbedBuilder()
                        .setTitle('Datos del Estudiante')
                        .setColor('LightGrey')
                        .setTimestamp()
                        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            { name: "Usuario:", value: `<@${user.id}>`},
                            { name: "ID:", value: user.id},
                            { name: "Membresía en Discord:", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: `Membresía en el servidor:`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`, inline: true},
                            { name: "Código Estudiantil:", value: collectInfo(user.id, buscarcode), inline: true},
                            { name: "Nombres:", value: collectInfo(user.id, buscarnombres), inline: true},
                            { name: "Carrera:", value: collectInfo(user.id, buscarcarrera), inline: true},
                            { name: "Sede:", value: collectInfo(user.id, buscarsede), inline: true},
                            { name: "Sobre mi:", value: collectInfo(user.id, buscardescription), inline: false},
                            { name: "Publico:", value: userinfopublic.toString(), inline: true},
                            { name: "Roles:", value: member.roles.cache.map(r => r).join(', '), inline: true}
                        );
                        return await interaction.reply({embeds: [embed]});
                    } else{
                        return interaction.reply({content: 'La información de este usuario es privada.'});
                    };
    
                };
            };

        } catch(err){
            console.log('El usuario aún no se ha registrado para poder verificarlo. Error');
            console.error(err);
            return interaction.reply({content: 'No existen datos del usuario!'});
        };
    },
};