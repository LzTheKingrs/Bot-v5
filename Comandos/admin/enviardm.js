const Discord = require("discord.js")

module.exports = {
  name: "enviar-dm", // Coloque o nome do comando
  description: "Faça eu falar na dm de alguem", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "mencione um usuario",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "mensagem",
        description: "Digite alguma frase",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },

],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const user = interaction.options.getUser("usuario");
        const string = interaction.options.getString("mensagem");

        interaction.reply({
            content: "enviado com sucesso",
            ephemeral:true
        })
        user.send({
            content:`${string}`
        })

  }}
}