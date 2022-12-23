const { ChatInputCommandInteraction, ActionRow, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, WelcomeScreen } = require('discord.js');
const Discord = require('discord.js');
const { Welcome } = require('niby-welcomes');
module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(member, client){
        try{
            const { guild } = member;

            let canalBienvenida = guild.channels.cache.get('1033216478209646633');
            let welcomeImage = await new Welcome()
                .setWelcomeMessage('BIENVENID@')
                .setUsername(member.user.tag, {color: '#ffffff'})
                .setMemberCount(`Eres el número #${member.guild.memberCount}`, {color: '#ffffff'})
                .setAvatar(member.user.displayAvatarURL({size: 512, extension: 'png'}))
                .setBackgroundUrl('https://cdn.discordapp.com/attachments/1030671839216816128/1055400600562577448/image.png', {opacity: 0.8})
                .setBorder(true, {color: '#ffffff', size: 15})
                .setStyle('koya')
                .build();

            let attachment = new client.AttachmentBuilder(welcomeImage, {name: `bienvenida-${member.user.tag}.png`});

            canalBienvenida.send({content: `Bienvenid@ ${member.user.tag}, espero te agrade la estadía en el servidor ${guild.name}.`,
            files: [attachment]
        }).catch((err) => {console.log(err)})
            console.log(`guildMemberAdd: ${member}`);
        } catch (err) {
            return console.log(err);
        }
    }
}