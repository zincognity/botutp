const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { collectInfo } = require('../../Functions/data/collectiInfo');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('edit')
    .setDescription('Editaré información específica de un usuario.')
    .addUserOption((option) => option.setName('target').setDescription('Usuario a editar').setRequired(true))
    .addStringOption((option) => option.setName('informacion')
        .setDescription('Información en específico a editar')
        .setRequired(true)
        .addChoices(
            { name: 'nombres', value: 'nombres'},
            { name: 'carrera', value: 'carrera'},
            { name: 'sede', value: 'sede'},
            { name: 'descripción', value: 'description'},
            { name: 'público', value: 'public'},
            ))
    .addStringOption((option) => option.setName('content').setDescription('contenido').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        const user = interaction.options.getUser('target');
        const opciones = interaction.options.getString('informacion');
        const content = interaction.options.getString('content');
        const usuario = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
        const canal = interaction.guild.channels.cache.get('1054294724741189642');
        const { guild } = interaction;

        try{
            let userid = await collectInfo(user.id);
            
            if(!userid){
                interaction.reply({content: 'No puedes editar los datos de este usuario debido a que aún no existen!'})
            }
            else{
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                .setTitle(`Han sido editado datos del usuario ${user.tag}`)
                .setColor('Orange')
                .setTimestamp()
                .setFooter({ text: `Editado por ${usuario.displayName}`, iconURL: `${usuario.displayAvatarURL({ dynamic: true })}` })
                .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                .addFields(
                    { name: `Parámetros editados`, value: `${opciones.toUpperCase()}`},
                    { name: `Antes`, value: `${await collectInfo(user.id, opciones)}`},
                    { name: `Después`, value: `${content}`}
                );

                if(opciones === 'nombres'){
                    let newData = await registerSchema.updateOne({ _id: user.id }, { nombres: content });
                    interaction.reply({content: 'Datos editados correctamente!'});
                    return canal.send({embeds: [embed]});
                };
        
                if(opciones === 'carrera'){
                    let newData = await registerSchema.updateOne({ _id: user.id }, { carrera: content });
                    interaction.reply({content: 'Datos editados correctamente!'});
                    return canal.send({embeds: [embed]});
                };
        
                if(opciones === 'sede'){
                    let newData = await registerSchema.updateOne({ _id: user.id }, { sede: content });
                    interaction.reply({content: 'Datos editados correctamente!'});
                    return canal.send({embeds: [embed]});
                };
        
                if(opciones === 'description'){
                    let newData = await registerSchema.updateOne({ _id: user.id }, { description: content });
                    interaction.reply({content: 'Datos editados correctamente!'});
                    return canal.send({embeds: [embed]});
                };
        
                if(opciones === 'public'){
                    let newData = await registerSchema.updateOne({ _id: user.id }, { public: content });
                    interaction.reply({content: 'Datos editados correctamente!'});
                    return canal.send({embeds: [embed]});
                };
            }
        } catch(err){
            return console.error(err);
        };
    },
};

// 2200888

// 20220888