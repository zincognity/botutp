const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

async function HelpFuntion(interaction, client){
    const { guild } = interaction;
    const emoji = await guild.emojis.fetch('1055215232311623680');
    const emojipublic = await guild.emojis.fetch('1033924186550317077');
    const emojiregistro = await guild.emojis.fetch('1031750331312390284');
    const emojimoderacion = await guild.emojis.fetch('1032412263962914916');
    const member = await interaction.guild.members.fetch(interaction.user.id).catch(console.error);

    const emojis = {
        Public: '📘',
        Moderacion: '🔰',
        Registro: '⚙'
    };

    const row = (estado, estilo1, estilo2, estilo3) => 
    new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('public')
            .setEmoji(emojis['Public'])
            .setLabel('Publico')
            .setStyle(estilo1)
            .setDisabled(estado),
            new ButtonBuilder()
            .setCustomId('registro')
            .setEmoji(emojis['Registro'])
            .setLabel('Registro')
            .setStyle(estilo2)
            .setDisabled(estado),
            new ButtonBuilder()
            .setCustomId('moderation')
            .setEmoji(emojis['Moderacion'])
            .setLabel('Moderación')
            .setStyle(estilo3)
            .setDisabled(estado)
        ); 
        
    const embed = new EmbedBuilder()
            .setTitle(`Comandos de ${guild.name} ${emoji}`)
            .setColor('Blue')
            .setDescription('UTP Bot es un bot dedicado completamente a la comunidad estudiantil de la Universidad Tecnológica del Perú, realizado con la idea de un grupo de estudiantes de este mismo para formar una sociedad en Discord.\n\nContamos con diferentes comandos que se irán sumando y actualizando en el transcurso del tiempo.\n\nPara utilizar algún comando escribe: **`/<nombre del comando>`** \nPor ejemplo: **`/help`**\n\nPara saber más información de los comandos, interactúe con los botones que se encuentran en la parte inferior de este mensaje.')
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`);

    const embedPublic = new EmbedBuilder()
            .setTitle(`Comandos de ${guild.name} ${emoji}`)
            .setColor('Blue')
            .setDescription('Estos comandos están destinados para todos los usuarios del servidor.')
            .setTimestamp()
            .addFields(
                { name: `${emojipublic} Comandos Públicos`, value: '**`/help, /ping, /userinfo`**'}
            )
            .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`);

    const embedRegistro = new EmbedBuilder()
            .setTitle(`Comandos de ${guild.name} ${emoji}`)
            .setColor('Blue')
            .setDescription('Estos comandos están destinados para todos los estudiantes de la UTP.')
            .setTimestamp()
            .addFields(
                { name: `${emojiregistro} Comandos Registro`, value: '**`/register, /deny, /confirm`**'}
            )
            .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`);

    const embedModeracion = new EmbedBuilder()
            .setTitle(`Comandos de ${guild.name} ${emoji}`)
            .setColor('Blue')
            .setDescription('Estos comandos están destinados para los moderadores del servidor.')
            .setTimestamp()
            .addFields(
                { name: `${emojimoderacion} Comandos Moderación`, value: '**`/ban, /kick, /say, /timeout`**'}
            )
            .setFooter({ text: `${client.user.username}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`);

    await interaction.reply({ embeds: [embed], components: [row(false, ButtonStyle.Primary, ButtonStyle.Primary, ButtonStyle.Primary)] });
    const filter = i => i.customId === 'public' || 'registro' || 'moderation' && i.autor.id === member.id;
    const collector = await interaction.channel.createMessageComponentCollector({ filter: filter });

    collector.on('collect', async i => {
        if(i.customId === 'public'){
            if(member.id !== i.user.id) return;
            return await i.update({ embeds: [embedPublic], components: [row(false, ButtonStyle.Secondary, ButtonStyle.Success, ButtonStyle.Success)] });
        }
        if(i.customId === 'registro'){
            if(member.id !== i.user.id) return;
            return await i.update({ embeds: [embedRegistro], components: [row(false, ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Success)] });
        }
        if(i.customId === 'moderation'){
            if(member.id !== i.user.id) return;
            return await i.update({ embeds: [embedModeracion], components: [row(false, ButtonStyle.Success, ButtonStyle.Success , ButtonStyle.Secondary)] });
        }
        setTimeout(() => i.deleteReply(), 20000);
    });
};

module.exports = { HelpFuntion };