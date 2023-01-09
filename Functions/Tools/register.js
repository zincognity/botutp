const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

async function RegisterFunction(interaction, client){
    const modalregister = new ModalBuilder()
        .setTitle('Registro de usuario de la UTP')
        .setCustomId('registerUserModal')
        .setComponents(
            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setLabel('Código')
                .setCustomId('code')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('U2230····')
                .setMaxLength(9)
                .setMinLength(9)
                .setRequired(true)
            ),

            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setLabel('Nombres Completos (Mayúsculas)')
                .setCustomId('nombres')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Fulano Emiliano Perez Rojas')
                .setMinLength(5)
                .setRequired(true)
            ),

            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setLabel('Carrera')
                .setCustomId('carrer')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('ING DE SISTEMAS')
                .setMinLength(2)
                .setRequired(true)
            ),
            
            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setLabel('Sede')
                .setCustomId('sede')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('CHICLAYO')
                .setMinLength(2)
                .setRequired(true)
            ),

            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setLabel('¿Deseas ser público? - Cuéntanos sobre ti')
                .setCustomId('informacion')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('SI/NO - Sobre ti')
                .setRequired(true)
            )
        );

    await interaction.showModal(modalregister);
    const { guild } = interaction;
    var time = 120 * 1000;
    
    const modalSubmitInteraction = await interaction.awaitModalSubmit({
        filter: (i) => {
            console.log('Esperando el modal');
            return true;
        },
        time: time
    }).catch(error => {
        // console.log(error)
        return null
    });

    const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);
    const canal = interaction.guild.channels.cache.get('1054294724741189642');

    if(modalSubmitInteraction){
        let codigo = await modalSubmitInteraction.fields.getTextInputValue('code');
        let nombre = await modalSubmitInteraction.fields.getTextInputValue('nombres');
        let carrera = await modalSubmitInteraction.fields.getTextInputValue('carrer');
        let sede = await modalSubmitInteraction.fields.getTextInputValue('sede');
        let informacion = await modalSubmitInteraction.fields.getTextInputValue('informacion');

        let [respuestas, asda] = informacion.split(' ', 1);

        let respuesta = respuestas.replace(/[^\w]/gi, '').toUpperCase();

        let iddc;
        let code;
        try{
            iddc = await registerSchema.findOne({ _id: member.id });

            code = await registerSchema.findOne({ code: codigo });

            if(respuesta === 'SI'){ respuesta = true; } else{ respuesta = true; };
            if(respuesta === 'NO'){ respuesta = false; } else{ respuesta = true; };

            if(!iddc){
                function separarRespuesta(){
                    var arrayinfo = informacion.split(' ');

                    for (var i=2; i = arrayinfo.length ; i++){
                        let separarrespuesta = arrayinfo.slice(1, i).toString();
                        return separarrespuesta.replace(/,/gi, ' ');
                    };
                };

                let descripcion = separarRespuesta();

                if(!descripcion) descripcion = 'Sin descripción';

                console.log('El id de dc no ha sido registrado');

                if(!code){
                    console.log(`${member.displayName} - Su codigo tampoco está registrado`);
                    let newData = await registerSchema.create({
                        _id: member.id,
                        code: codigo.toUpperCase(),
                        nombres: nombre.toUpperCase(),
                        carrera: carrera.toUpperCase(),
                        sede: sede.toUpperCase(),
                        description: descripcion,
                        public: respuesta
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
                    });
                    if(respuesta === true) respuesta = 'SI';
                    if(respuesta === false) respuesta = 'NO';
                    const embedconfirm = new EmbedBuilder()
                    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                    .setTitle(`${member.displayName} ha enviado sus datos!`)
                    .setDescription('El estudiante ha completado el formulario para confirmar su verificación, a continuanción sus datos a verificar.')
                    .setColor('Orange')
                    .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()
                    .addFields(
                        { name: "ID de Discord", value: member.id},
                        { name: "Código Estudiantil", value: codigo.toUpperCase()},
                        { name: "Nombres", value: nombre.toUpperCase()},
                        { name: "Carrera", value: carrera.toUpperCase()},
                        { name: "Sede", value: sede.toUpperCase()},
                        { name: "Descripcion", value: `${descripcion}`},
                        { name: "Información Pública", value: `${respuesta}`}
                    )
                    .setFooter({ 
                        text: `Solicitado por: ${member.displayName}`,
                        iconURL: member.displayAvatarURL()
                    });

                    await canal.send({embeds: [embedconfirm]});
                    return await modalSubmitInteraction.reply({embeds: [embed]});
                } else if(code){
                    let codigodediscord = code['code'];
                    if(codigodediscord === codigo){
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
                        return await modalSubmitInteraction.reply({embeds: [embed]});
                    };
                };
            } else if(iddc){
                console.log(`${member.displayName} - Su cuenta de Discord ya ha sido registrado`);
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
                .setTitle(`${member.displayName} tu discord ya ha sido registrado en el servidor!`)
                .setDescription('Tu cuenta de **`discord`** ya ha registrado una cuenta de la **`UTP`**, si crees que se trata de un **`error`** contáctese con algún administrador.')
                .setColor('Red')
                .setTimestamp()
                .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
                .addFields(
                    { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta **`24h`**, por favor sea paciente."
                })
                .setFooter({ 
                    text: `Solicitado por: ${member.displayName}`,
                    iconURL: member.displayAvatarURL()
                })
                return await modalSubmitInteraction.reply({embeds: [embed]});
            };
        } catch(err){
            console.log(`${member.displayName} algo ha fallado!`);
            console.log(err);
            const embed = new EmbedBuilder()
            .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
            .setTitle(`${member.displayName} algo ha fallado!`)
            .setDescription('Hubo un error de datos en tu formulario, por favor, leer bien cada una de las indicaciones, si el problema persiste, tenga la opción de contactar con algún administrador.')
            .setColor('Red')
            .setTimestamp()
            .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
            .addFields(
                    { name: "Advertencia:", value: "El tiempo de espera puede ser de hasta **`24h`**, por favor sea paciente."})
            .setFooter({ 
                    text: `Solicitado por: ${member.displayName}`,
                    iconURL: member.displayAvatarURL()
                });
            return await modalSubmitInteraction.reply({embeds: [embed]});
        }
    } else{
        const embed = new EmbedBuilder()
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}`})
        .setTitle(`${member.displayName} has tardado mucho en intentar registrarte!`)
        .setDescription('Tardaste más de **`2 min`**, si aún no te has registrado, te invito a realizarlo nuevamente!')
        .setColor('DarOrange')
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/attachments/1030651430027137054/1054434469341302844/20221219_112302.png`)
        .setFooter({ 
            text: `Solicitado por: ${member.displayName}`,
            iconURL: member.displayAvatarURL()
        });
        await member.send({embeds: [embed]});
        return console.log('Se demoró ;v');
    };
}

module.exports = { RegisterFunction };