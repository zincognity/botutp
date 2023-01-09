const { loadCommands } = require('../../Handlers/commandHandler');
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json')

module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log('El cliente se ha iniciado.');

        const canal = client.channels.cache.get('1030899486173708313');

        canal.send({content: 'Hola si, ando encendio uwu'});
        
        client.user.setPresence({
            activities: [{
                name: 'Solo comandos Slash (/)',
                type: ActivityType.Watching,
                url: 'https://www.twitch.tv/sxberbia'
            }],
            status: 'dnd'
        });

        loadCommands(client);

        mongoose.connect(config.mongoDB, {
            useNewURLParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Conectado a la base de datos de MongoDB');
        }).catch((err) => {
            console.log('No se ha posido conectar a la base de datos de MongoDB');
            console.log(err);
        });
    },
};