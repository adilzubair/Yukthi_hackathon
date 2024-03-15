const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { OpenAI } = require("openai")

require("dotenv").config();

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log("Client is ready");
});

client.initialize();


const openai = new OpenAI({
    apiKey: process.env.SECRET_KEY // This is also the default, can be omitted if the API key is set in the environment variables
  });

async function runCompletion(message) {
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
    return completion.choices[0].message.content;
}

client.on('message', message => {
    console.log(message.body);
    runCompletion(message.body).then(result => message.reply(result));
});