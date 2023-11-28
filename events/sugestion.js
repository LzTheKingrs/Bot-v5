const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs')
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });



module.exports = {
    name: 'denuncia',
    async execute(interaction) {
      const denuncia = await db2.get(`canal_denuncia_${interaction.guild.id}`);
      const avaliation = await db2.get(`canal_avalia_${interaction.guild.id}`);
      const sugestão = await db2.get(`canal_sugestion_${interaction.guild.id}`);
      const duvida = await db2.get(`canal_duvida_${interaction.guild.id}`);
        if (
            interaction.isStringSelectMenu() &&
            interaction.customId === "options_painel"
          ) {
      
            const option = interaction.values[0];
            if (option === "denuncia") {

              const modal = new Discord.ModalBuilder()
        .setCustomId("modal_denuncia")
        .setTitle(`Faça a Sua Denuncia`);

        const title = new Discord.TextInputBuilder()
        .setCustomId("title")
        .setLabel("Qual é a sua denuncia?")
        .setRequired(true)
        .setMaxLength(150)
        .setStyle(1)
        .setPlaceholder("Denuncia");
        const title2 = new Discord.TextInputBuilder()
        .setCustomId("title2")
        .setLabel("Qual é o nome e o id do usuario?")
        .setRequired(true)
        .setMaxLength(150)
        .setStyle(1)
        .setPlaceholder("id - nickname");

        const description = new Discord.TextInputBuilder()
        .setCustomId("description")
        .setLabel("Qual é o a descrição?")
        .setRequired(true)
        .setMaxLength(255)
        .setStyle(2)
        .setPlaceholder("Ele fez tal coisa...");
        const imagem = new Discord.TextInputBuilder()
        .setCustomId("url")
        .setLabel("mande alguma prova")
        .setRequired(false)
        .setMaxLength(255)
        .setStyle(2)
        .setPlaceholder("url por gentileza, não obrigatorio");

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(title),
        new Discord.ActionRowBuilder().addComponents(description),
        new Discord.ActionRowBuilder().addComponents(title2),
        new Discord.ActionRowBuilder().addComponents(imagem)
        );

      return interaction.showModal(modal);

            }
            if (option === "duvida") {

              const modal = new Discord.ModalBuilder()
        .setCustomId("duvida_modal")
        .setTitle(`Faça a Sua Duvida?`);

      const title = new Discord.TextInputBuilder()
        .setCustomId("title")
        .setLabel("Qual é a sua Duvida?")
        .setRequired(true)
        .setMaxLength(150)
        .setStyle(1)
        .setPlaceholder("Duvida");

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(title),
        );

      return interaction.showModal(modal);

            }
            if (option === "sugestion") {
                
                const modal = new Discord.ModalBuilder()
                .setCustomId("modal_sugestion")
                .setTitle(`Faça a Sua Sugestão`);
        
              const title = new Discord.TextInputBuilder()
                .setCustomId("title")
                .setLabel("Qual é a sua Sugestão?")
                .setRequired(true)
                .setMaxLength(150)
                .setStyle(1)
                .setPlaceholder("Sugestão");
        
                const description = new Discord.TextInputBuilder()
                .setCustomId("description")
                .setLabel("Qual é a descrição?")
                .setRequired(true)
                .setMaxLength(255)
                .setStyle(2)
                .setPlaceholder("eu quero que adicione tal coisa...");
    
    
              modal.addComponents(
                new Discord.ActionRowBuilder().addComponents(title),
                new Discord.ActionRowBuilder().addComponents(description),
                );
        
              return interaction.showModal(modal);
                }

                if (option === "avaliation") {
                
                    const modal = new Discord.ModalBuilder()
                    .setCustomId("modal_avalation")
                    .setTitle(`Faça a Sua avaliação`);

                    const numero = new Discord.TextInputBuilder()
                    .setCustomId("number")
                    .setLabel("escolha um numero de 1/5")
                    .setRequired(true)
                    .setMaxLength(150)
                    .setStyle(1)
                    .setPlaceholder("apenas algum desses numeros");
            
                    const description = new Discord.TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("Qual é a descrição da sua avaliação?")
                    .setRequired(true)
                    .setMaxLength(255)
                    .setStyle(2)
                    .setPlaceholder("eu gostei de tal coisa...");
        
        
                  modal.addComponents(
                    new Discord.ActionRowBuilder().addComponents(numero),
                    new Discord.ActionRowBuilder().addComponents(description),
                    );
            
                  return interaction.showModal(modal);
                    }
        
        }


        if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_avalation"
          ) {
            const chanel = interaction.client.channels.cache.get(avaliation);
            const input = interaction.fields.getTextInputValue("number");
            const descri = interaction.fields.getTextInputValue("description");

        switch (input) {
            case "1": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️ (1/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]
            })
                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "2": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️ (2/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})
                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "3": {

                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️ (3/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "4": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️⭐️ (4/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "5": {

                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️⭐️⭐️ (5/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            default: {
              interaction.reply({content:"Você não escolheu numero de 1 a 5", ephemeral:true});
          } break;

    }
          }
          if (
            interaction.isModalSubmit() &&
            interaction.customId === "duvida_modal"
          ) {
            interaction.reply({
              content:"Sua Duvida foi enviada"
            })

            const title = interaction.fields.getTextInputValue("title");
            const chanel = interaction.guild.channels.cache.get(duvida)
            
            await chanel.send({
                embeds:[ 
                  new Discord.EmbedBuilder()
                  .setDescription(`Quem enviou a duvida: ${interaction.user} \n Sua Duvida: ${title}`)
                ]
            })

          }

          if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_sugestion"
          ) {
            const title = interaction.fields.getTextInputValue("title");
            const description = interaction.fields.getTextInputValue("description");
            const chanel = interaction.guild.channels.cache.get(sugestão)
            
            await chanel.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`❤️ | Nova Sugestão`)
                    .addFields({ name:`👥 | Usuario que fez a sugestão:`, value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({ name:`💡 | Sua Sugestão:`, value:`${title}`})
                    .addFields({ name:`📑 | Descrição:`, value:`${description}`})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                ]
            })

            interaction.reply({content:`${interaction.user} Sua Sugestão foi enviada com sucesso!`, ephemeral:true})

          }

           if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_denuncia"
          ) {
            
            
            interaction.reply({content:`${interaction.user} Sua Denuncia foi Enviada com Sucesso!`, ephemeral:true})

            const chanel = interaction.guild.channels.cache.get(denuncia)

            const title = interaction.fields.getTextInputValue("title");

            const title2 = interaction.fields.getTextInputValue("title2")

            const description = interaction.fields.getTextInputValue("description");
            const url = interaction.fields.getTextInputValue("url");


            const embed = new Discord.EmbedBuilder()
            .setDescription(`Quem Enviou a denuncia:** ${interaction.user}**\n Usuario: **${title2}** \nMotivo da Denuncia: **${title}** \nDescrição da denuncia: **${description}**`)

            if(url){
                embed.setImage(`${url}`)
            }

            chanel.send({
                embeds:[embed]
            })

          }
}}