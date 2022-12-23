const { AttachmentBuilder } = require('discord.js');
const { Welcome } = require('niby-welcomes');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member){
        try{
            const { guild } = member;

            let canalBienvenida = guild.channels.cache.get('1033216478209646633');
            let canalInfo = guild.channels.cache.get('1030886936610607114');
            let welcomeImage = await new Welcome()
                .setWelcomeMessage('BIENVENID@')
                .setUsername(member.user.tag, {color: '#D3052D'})
                .setAvatar(member.user.displayAvatarURL({size: 512, extension: 'png'}))
                .setBackgroundUrl('https://i.imgur.com/uTitBxz.jpg', {opacity: 0})
                .setBorder(true, {color: '#D3052D', size: 5})
                .setMemberCount("")
                .setStyle('koya')
                .build();

            let attachment = new AttachmentBuilder(welcomeImage, {name: `bienvenida-${member.user.tag}.png`});
            canalBienvenida.send({content: `${member} dirígete a ${canalInfo} para saber sobre que trata el servidor y su temática. \nEsperamos que te agrade la estadía en el servidor **${guild.name}.**`,
                files: [attachment]
            }).catch((err) => {console.log(err)});
        } catch (err) {
            return console.log(err);
        };
    },
};