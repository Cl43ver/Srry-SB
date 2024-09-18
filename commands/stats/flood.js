const { WebEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "flood",
    aliases: ["spam"],
    description: "Spamme un message toutes les 3 secondes de manière continue.",
    run: async (message, args, command, client) => {
        message.delete();


        const spamxd = args.join(" ");

        if (!spamxd) {
            return await message.channel.send("Veuillez fournir un message à spammer.").then(m => deleteMessage(m));
        }

        try {

            const intervalId = setInterval(async () => {
                await message.channel.send(spamxd);
            }, 3000); 


            await message.channel.send("Spam continu démarré. Pour arrêter, utilise la commande `stopSpam`.");


            client.spamInterval = intervalId;
        } catch (error) {
            console.error(error);
            return message.channel.send("Erreur lors de l'envoi des messages spam.").then(m => deleteMessage(m));
        }
    }
};

async function deleteMessage(me) {
    setTimeout(() => {
        me.delete();
    }, 1000);
}
