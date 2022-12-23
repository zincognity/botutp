const { AttachmentBuilder } = require('discord.js');
const { Welcome } = require('niby-welcomes');
module.exports = {
    name: 'guildMemberRemove',
    async execute(member){
        try{
            const { guild } = member;

            let canalDespedidas = guild.channels.cache.get('1033216515492823080');
            let welcomeImage = await new Welcome()
                .setWelcomeMessage('ADIÓS')
                .setUsername(member.user.tag, {color: '#D3052D'})
                .setAvatar(member.user.displayAvatarURL({size: 512, extension: 'png'}))
                .setBackgroundUrl('https://i.imgur.com/uTitBxz.jpg', {opacity: 0.2})
                .setBorder(true, {color: '#D3052D', size: 5})
                .setMemberCount("")
                .setStyle('koya')
                .build();

            let attachment = new AttachmentBuilder(welcomeImage, {name: `bienvenida-${member.user.tag}.png`});

            canalDespedidas.send({content: `${member} ha dejado el servidor.`,
                files: [attachment]
            }).catch((err) => {console.log(err)});
        } catch (err) {
            return console.log(err);
        };
    },
};