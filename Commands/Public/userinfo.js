const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { collectInfo } = require('../../Functions/data/collectiInfo');

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

        if(user.id === client.user.id) return await interaction.reply({content: 'No hay información sobre mi.', ephemeral: true});
        if(!member.roles.cache.has('1020836518509682828')) return await interaction.reply({content: 'El usuario no está verificado, por ende, no hay información sobre este.', ephemeral: true});

        try{
            let userid = await collectInfo(user.id);

            if(!userid){
                return await interaction.reply({content: `El usuario ${user.username}#${user.discriminator} aún no se ha registrado!`});
            } else{
                let buscarinfo = ['code', 'nombres', 'carrera', 'sede', 'description', 'public'];
                let respuestainfo = buscarinfo.map((x) => {
                    let collector = collectInfo(user.id, x)
                    return collector;
                });

                let userinfopublic = await respuestainfo[5];
    
                if(userinfopublic === true) userinfopublic = 'SI';
                if(userinfopublic === false) userinfopublic = 'NO';

                const embed = new EmbedBuilder()
                .setTitle('Datos del Estudiante')
                .setColor('LightGrey')
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
                .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                .addFields(                    { name: "Usuario:", value: `<@${user.id}>`},
                { name: "ID:", value: user.id},
                { name: "Membresía en Discord:", value: `<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>`, inline: true},
                { name: `Membresía en el servidor:`, value: `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`, inline: true},
                { name: "Código Estudiantil:", value: await respuestainfo[0], inline: true},
                { name: "Nombres:", value: await respuestainfo[1], inline: true},
                { name: "Carrera:", value: await respuestainfo[2], inline: true},
                { name: "Sede:", value: await respuestainfo[3], inline: true},
                { name: "Sobre mi:", value: await respuestainfo[4], inline: false},
                { name: "Publico:", value: userinfopublic, inline: true},
                { name: "Roles:", value: member.roles.cache.map(r => r).join(', '), inline: true}
                );
    
                if(userinfopublic === 'SI'){
                    if(user.id !== interaction.user.id){
                        return await interaction.reply({embeds: [embed]});
                    } else if(user.id === interaction.user.id){
                        return await interaction.reply({embeds: [embed]});
                    };
                } else if(userinfopublic === 'NO'){
                    if(usuario.id === '245702253971898379' || user.id === interaction.user.id){
                        return await interaction.reply({embeds: [embed], ephemeral: true});
                    } else{
                        return await interaction.reply({content: 'La información de este usuario es privada.'});
                    };
                };
            };
        } catch(err){
            console.log('El usuario aún no se ha registrado para poder verificarlo. Error');
            console.log(err);
            return interaction.reply({content: 'No existen datos del usuario!'});
        };
    },
};