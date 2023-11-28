const Discord = require("discord.js");
const randomString = require("randomized-string");
const config = require("../config.json");
const {
    Client,
    CommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputStyle,
    TextInputBuilder,
    ModalBuilder,
  } = require("discord.js");

module.exports = {
    name: 'denuncia',
    async execute(interaction) {

        if (interaction.isButton() && interaction.customId === "duvidaxs") {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`Olá ${interaction.user}, Aqui está uma Breve explicação de como fazer o captcha \n\n Primeiramente, clique no botão ao lado no caso **REALIZAR VERIFICAÇÂO** Logo Após, apareça uma mensagem estando o seu codigo, você copiara e clicara no botão logo abaixo da mensagem, e coloque seu codigo lá, e depois em enviar, logo após, você já tera acesso ao servidor! `)
                ],
                ephemeral:true
            })
        }

       // if (interaction.isButton() && interaction.customId === "verification") {
       //     
       //     const modal = new Discord.ModalBuilder()
       //         .setCustomId("verification_modal")
       //         .setTitle(`Coloque o codigo da sua verificação!`);
       // 
       //       const title = new Discord.TextInputBuilder()
       //         .setCustomId("title")
       //         .setLabel(`O Seu Codigo é este: ${randomToken}`)
       //         .setRequired(true)
       //         .setMaxLength(4)
       //         .setMinLength(4)
       //         .setStyle(1)
       //         .setPlaceholder(`${randomToken}`);
    //
       //       modal.addComponents(
       //         new Discord.ActionRowBuilder().addComponents(title),
       //         );
       // 
       //       return interaction.showModal(modal);
       // }

        switch (interaction.customId) {
            case "verification": {
                const roleSchema = config.role_verify
              const verifyRoleId = roleSchema
    
              var randomToken = randomString
                .generate({ length: 5, charset: "hex" })
                .toUpperCase();
    
              if (
                interaction.member.roles.cache.some(
                  (role) => role.id === verifyRoleId
                )
              ) {
                interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        "Você já se verificou"
                      )
                      .setColor("Blue"),
                  ],
                  ephemeral: true,
                });
                return;
              }
    
              const modal = new ModalBuilder()
                .setCustomId("verifyUserModal")
                .setTitle(`Codigo de Verificação: ${randomToken}`)
                .setComponents(
                  new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                      .setCustomId("veryUserInput")
                      .setLabel(`Seu codigo: ${randomToken}`)
                      .setStyle(TextInputStyle.Short)
                      .setRequired(true)
                      .setMaxLength(5)
                  )
                ); //
    
              await interaction.showModal(modal);
              const modalSubmitInt = await interaction
                .awaitModalSubmit({
                  filter: (i) => {
                    return true;
                  },
                  time: 600000,
                })
                .catch((e) => {
                  console.log(e);
                });
    
              if (
                modalSubmitInt.fields
                  .getTextInputValue("veryUserInput")
                  .toUpperCase() === randomToken
              ) {
                const role = interaction.guild.roles.cache.get(verifyRoleId);
    
                await interaction.member.roles.add(role).then((m) => {
                interaction.followUp({content:"verificado", ephemeral: true})
                  interaction.user
                    .send({
                      embeds: [
                        new EmbedBuilder()
                          .setTitle("Verificação foi um sucesso!")
                          .setDescription(
                            `Você foi verificado e recebeu o cargo: ${role.name}`
                          )
                          .setColor("Green"),
                      ],
                      ephemeral: true,
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              }
    
              if (
                modalSubmitInt.fields
                  .getTextInputValue("veryUserInput")
                  .toUpperCase() !== randomToken
              ) {
                interaction.followUp({
                  content: "Você erro o codigo",
                });
              }
              break;
            }
    
            default:
              break;
          }
        


    }}

    