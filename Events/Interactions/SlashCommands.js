const { ChatInputCommandInteraction, ActionRow, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        // if(interaction.isStringSelectMenu()){

        //     // const help = new ActionRowBuilder()
        //     // .addComponents(
        //     //     new StringSelectMenuBuilder()
        //     //     .setCustomId('categorias')
        //     //     .setPlaceholder('🔲 Categorías')
        //     //     .setMaxValues(1)
        //     //     .setMinValues(1)
        //     //     .addOptions(
        //     //         new StringSelectMenuOptionBuilder({
        //     //             label: 'General',
        //     //             description: 'Mira mis comandos para todos los usuarios',
        //     //             value: 'general',
        //     //             emoji: '📘'
        //     //         }),
        //     //         new StringSelectMenuOptionBuilder({
        //     //             label: 'Moderación',
        //     //             description: 'Mira mis comandos solo para moderadores',
        //     //             value: 'moderation',
        //     //             emoji: '🔰'
        //     //         }),
        //     //         new StringSelectMenuOptionBuilder({
        //     //             label: 'Herramientas',
        //     //             description: 'Mira mis comandos solo para estudiantes',
        //     //             value: 'herramientas',
        //     //             emoji: '⚙'
        //     //         })
        //     //     )
        //     // )

        //     // if (interaction.values[0] === 'general'){
        //     //     await interaction.deferReply();
        //     //     interaction.editReply({ content: `Has escogido ${interaction.values[0]}`, components: [help]})
        //     // };

        //     // if (interaction.values[0] === 'moderation'){
        //     //     interaction.editReply({ content: `Has escogido ${interaction.values[0]}`, components: [help]})
        //     // };

        //     // if (interaction.values[0] === 'herramientas'){
        //     //     await interaction.deferReply();
        //     //     interaction.editReply({ content: `Has escogido ${interaction.values[0]}`, components: [new ActionRowBuilder().addComponents(help)]})
        //     // };
        // }

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