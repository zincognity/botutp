const { ChatInputCommandInteraction, ActionRow, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
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

        command.execute(interaction, client);
    }
}