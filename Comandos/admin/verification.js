const Discord = require("discord.js")
const config = require("../../config.json")
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });

module.exports = {
  name: "verificar", // Coloque o nome do comando
  description: "Painel de Verificação", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {

        interaction.reply({
            content:"Painel de Verificação enviada com sucesso!",
            ephemeral:true
        })
        const thumbnail = await db2.get(`thumbnail_ticket_${interaction.guild.id}`)
        interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_invisible)
                    .setImage(thumbnail)
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`Olá, aqui está o nosso novo sistema de verificação Simples! \n Para se Verificar, basta clicar no botão, logo abrira um painel e terá um codigo, digite o codigo e você receberá o cargo de verificado e terá acesso ao servidor por completo!`)
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("verification")
                    .setLabel("Realizar Verificação")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji("<:Recaptcha_logo:1155681847708233819>"),
                    new Discord.ButtonBuilder()
                    .setCustomId("duvidaxs")
                    .setLabel("Duvida")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("<:white_lupa:1129993776065155173>"),
                )
            ]
        })

    }
  }
}