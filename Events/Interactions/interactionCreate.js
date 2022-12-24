const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if(!command)
                return interaction.reply({
                    content: 'This command is outdated',
                    ephemeral: true,
                });

            if (command.developer && interaction.user.id !== "245702253971898379")
                return interaction.reply({
                    content: 'Este comando es solo para el developer.',
                    ephemeral: true,
                });

            try{
                await command.execute(interaction, client);
            } catch(err){
                console.error(err);
                await interaction.reply({ content: 'Hubo un fallo al ejecutar este comando!', ephemeral: true });
            }
        }
        
        if(interaction.isContextMenuCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const contextCommand = commands.get(commandName);

            if(!contextCommand) return;

            try{
                await contextCommand.execute(interaction, client);
            }catch(err){
                console.error(err);
            }
        }
    },
};