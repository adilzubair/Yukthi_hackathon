const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { openai } = require("openai");
require("dotenv").config();

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.once('ready', () => {
    console.log("Client is ready");
});

client.initialize();

async function runCompletion(message) {
    const completion = await openai.complete({
        engine: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    return completion.choices[0].text;
}

client.on('message_create', message => {
    console.log(message.body);
    runCompletion(message.body).then(result => message.reply(result));
});