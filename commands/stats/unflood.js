module.exports = {
    name: "unflood",
    aliases: ["stopspam"],
    description: "Arrête le spam continu.",
    run: async (message, args, command, client) => {
        message.delete();


        if (client.spamInterval) {
            clearInterval(client.spamInterval);
            client.spamInterval = null;
            await message.channel.send("Spam continu arrêté.");
        } else {
            await message.channel.send("Aucun spam continu en cours.").then(m => deleteMessage(m));
        }
    }
};

async function deleteMessage(me) {
    setTimeout(() => {
        me.delete();
    }, 1000);
}
