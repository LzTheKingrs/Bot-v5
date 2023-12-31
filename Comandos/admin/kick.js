const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicke um usuario do discord",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Selecione um usuario',
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name: 'motivo',
            description: 'Defina um motivo para kickar o usuario',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {


        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `Ola ${interaction.user}, Você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            const user = interaction.options.getUser("user")
            const user2 = interaction.guild.members.cache.get(user.id)
            const motivo = interaction.options.getString("motivo")
            if (!motivo) motivo = "Não definido"
            if (!user) return interaction.reply({ content: 'Insira um id ou usuário válido', ephemeral: true })


            const ryan = new Discord.EmbedBuilder()
                .setColor("Blue")
                .setDescription(`
            **O usuario ${user} (\`${interaction.user.id}\`) foi kickado do servidor pelo motivo \`${motivo}\` com sucesso!**`)
                .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });

            user2.kick({ reason: [motivo] }).then(() => {

                interaction.reply({ embeds: [ryan] })
            })
        }
    }
}


