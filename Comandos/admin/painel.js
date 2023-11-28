const Discord = require("discord.js")
const config = require("../../config.json")
const { QuickDB } = require('quick.db');
const db2 = new QuickDB({ table: "botconfig" });

module.exports = {
  name: "painel", // Coloque o nome do comando
  description: "Abra o painel sugestao e avaliacao", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const thumbnail = await db2.get(`thumbnail_ticket_${interaction.guild.id}`)
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        interaction.reply({content:"painel enviado com sucesso", ephemeral:true})
        interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("Blue")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`<:escudo:1130530423311716443> **Suporte Mont Shop** <:escudo:1130530423311716443>  \n\n<:white_lupa:1129993776065155173> **| Sugestões:** \n> Sugestões se encontram na 1 opção! \n\n<a:adenuncia:1130967273255997542> **| Denuncias:** \n> Denuncie algum caso que sofreu na 2 opção! \n\n<:cdl_pessoa:1127799875589906502> **| Duvida:** \n> Tire sua duvida na 3 opção! \n\n<:avaliaes:1147135721942044712> **| Avaliação:** \n> Avalie a nossa loja no ultimo botão!\n\n<:8965vslticket:1155692771831730186> **| Nosso Ticket:** \n> <#1153070624630120549>`)
                    .setImage(thumbnail)
                    .setFooter({ text: `Copyright © Mont Shop` })
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                    .setCustomId("options_painel")
                    .setPlaceholder("Escolha uma opção!")
                    .addOptions(
                        {
                            label: "Sugestão",
                            value: `sugestion`,
                            emoji:`<:white_lupa:1129993776065155173>`
                        },
                        {
                            label: "Denunciar",
                            value: `denuncia`,
                            emoji: `<a:adenuncia:1130967273255997542>`
                        },
                        {
                            label: "Duvida",
                            value: `duvida`,
                            emoji:`<:cdl_pessoa:1127799875589906502>`
                        },
                        {
                            label: "Avaliar",
                            value: `avaliation`,
                            emoji:`<:avaliaes:1147135721942044712>`
                        },

              )
                )
            ]
        })
    }

  }
}