const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Colors } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('registere')
    .setDescription('Te registraré para poder confirmar que eres estudiante de la UTP.')
    .addStringOption((option) => option.setName('codigo').setDescription('Código de la universidad').setRequired(true))
    .addStringOption((option) => option.setName('nombre').setDescription('Nombres completos en mayúscula (Apellidos Nombres)').setRequired(true))
    .addStringOption((option) => 
        option.setName('carrera')
            .setDescription('Carrera que estás estudiando')
            .setRequired(true)
            .addChoices(
                { name: 'Ingeniería', value: 'INGENIERIA' },
                { name: 'Arte', value: 'Arte' },
                { name: 'Administración y Negocios', value: 'ADMINISTRACION Y NEGOCIOS' },
                { name: 'Ciencias de la Salud', value: 'CIENCIAS DE LA SALUD' },
                { name: 'Ciencias Sociales', value: 'CIENCIAS SOCIALES' },
                { name: 'Ciencias Exactas', value: 'CIENCIAS EXACTAS' },
                { name: 'Humanidades', value: 'HUMANIDADES' },
            ))
    .addStringOption((option) => 
        option.setName('sede')
            .setDescription('Sede o lugar en donde estás estudiando')
            .setRequired(true)
            .addChoices(
                { name: 'Arequipa', value: 'AREQUIPA' },
                { name: 'Chiclayo', value: 'CHICLAYO' },
                { name: 'Chimbote', value: 'CHIMBOTE' },
                { name: 'Huancayo', value: 'HUANCAYO' },
                { name: 'Ica', value: 'ICA' },
                { name: 'Piura', value: 'PIURA' },
                { name: 'Trujillo', value: 'TRUJILLO' },
                { name: 'Lima Centro', value: 'LIMA CENTRO' },
                { name: 'Lima Este - ATE', value: 'LIMA ESTE - ATE' },
                { name: 'Lima Este - SJL', value: 'LIMA ESTE - SJL' },
                { name: 'Lima Norte', value: 'LIMA NORTE' },
                { name: 'Lima Sur', value: 'LIMA SUR' }
            ))
    .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const { guild } = interaction;

        let codigo = interaction.options.getString('codigo');
        let nombre = interaction.options.getString('nombre');
        let carrera = interaction.options.getString('carrera');
        let sede = interaction.options.getString('sede');

        const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);

        const canal = interaction.guild.channels.cache.get('1054294724741189642');
        
        let iddc;
        let code;
        try{
            iddc = await registerSchema.findOne({
                _id: member.id
            });

            code = await registerSchema.findOne({
                code: codigo
            });

            if(!iddc){
                console.log('El id de dc no ha sido registrado');
                if(!code){
                    console.log(`${member.displayName} - Su codigo tampoco está registrado`)
                    let newData = await registerSchema.create({
                        _id: member.id,
                        code: codigo,
                        nombres: nombre,
                        carrera: carrera,
                        sede: sede
                    })
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setTitle(`${member.displayName} tu registro a sido cargado con exito!`)
                    .setDescription('Tus **`datos`** han sido cargados exitósamente para que los moderadores lo revisen adecuadamente y te permitan el **`acceso`** al servidor.')
                    .setColor('Green')
                    .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()
                    .addFields(
                        { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta **`24h`**, por favor sea paciente."})
                    .setFooter({ 
                        text: `Solicitado por: ${member.displayName}`,
                        iconURL: member.displayAvatarURL()
                    })

                    const embedconfirm = new EmbedBuilder()
                    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setTitle(`${member.displayName} ha enviado sus datos!`)
                    .setDescription('El estudiante ha completado el formulario para confirmar su verificación, a continuanción sus datos a verificar.')
                    .setColor('Orange')
                    .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()
                    .addFields(
                        { name: "ID de Discord", value: member.id},
                        { name: "Código Estudiantil", value: codigo},
                        { name: "Nombres", value: nombre},
                        { name: "Carrera", value: carrera},
                        { name: "Sede", value: sede}
                    )
                    .setFooter({ 
                        text: `Solicitado por: ${member.displayName}`,
                        iconURL: member.displayAvatarURL()
                    })

                    canal.send({embeds: [embedconfirm]});

                    return interaction.reply({embeds: [embed]});
                } else{
                    console.log(`${member.displayName} - Su codigo ya ha sido registrado`);
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setTitle(`${member.displayName} tu código ya ha sido registrado en el servidor!`)
                    .setDescription('Tu **`código`** de la universidad ya ha sido registrado con otra cuenta de **`discord`**, si crees que se trata de un **`error`** contáctese con algún administrador.')
                    .setColor('Red')
                    .setTimestamp()
                    .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
                    .addFields(
                        { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta ``24h``, por favor sea paciente."})
                    .setFooter({ 
                        text: `Solicitado por: ${member.displayName}`,
                        iconURL: member.displayAvatarURL()
                    })
        
                    return interaction.reply({embeds: [embed]});
                }
            } else{
                console.log(`${member.displayName} su ID de discord ya está registrado`);
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                .setTitle(`${member.displayName} tu discord ya ha sido registrado en el servidor!`)
                .setDescription('Tu cuenta de **`discord`** ya ha registrado una cuenta de la **`UTP`**, si crees que se trata de un **`error`** contáctese con algún administrador.')
                .setColor('Red')
                .setTimestamp()
                .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
                .addFields(
                        { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta **`24h`**, por favor sea paciente."})
                .setFooter({ 
                        text: `Solicitado por: ${member.displayName}`,
                        iconURL: member.displayAvatarURL()
                    })
                return interaction.reply({embeds: [embed]});
            }

        } catch (err) {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
            .setTitle(`${member.displayName} ya has sido registrado en el servidor!`)
            .setDescription('Tu **`discord`** y **`código`** ya han sido registrados, si crees que se trata de un **`error`** contáctese con algún administrador.')
            .setColor('Red')
            .setTimestamp()
            .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
            .addFields(
                { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta **`24h`**, por favor sea paciente."})
            .setFooter({ 
                text: `Solicitado por: ${member.displayName}`,
                iconURL: member.displayAvatarURL()
            })
            console.log(err);
            return interaction.reply({embeds: [embed]});
        }

    },
};