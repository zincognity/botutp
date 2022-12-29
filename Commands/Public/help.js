const { SlashCommandBuilder } = require('discord.js');
const { HelpFuntion } = require('../../Functions/Tools/help');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Obtendrás una lista de comandos y explicaciones de cada uno de ellos.'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        HelpFuntion(interaction, client);
    },
};

// .then(m => {m.interaction.editReply({content: 'A button was clicked!',components: [row(true)]})});