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
      const assistant = await openai.beta.assistants.create({
        instructions: "You are a customer support chatbot at a hotel that takes orders from the users. Your job is that of a waiter. First when the user says start greet them with some catchy welcome statement with name of the hotel which is Taj . after that show a menu of foods available in the hotel. for the timebeing show only pizza and coca cola then burger and pepsi . show it as a menu . when user selects one of the menu item remember that. Use your knowledge base to best respond to customer queries.",
       
        model: "gpt-3.5-turbo",
        tools: [{"type": "retrieval"}]
      });

      const thread = await openai.beta.threads.create({
        messages: [
          {
            "role": "user",
            "content": message,
            "file_ids": [file.id]
          }
        ]
      });
    
      console.log(assistant.choices[0]);
    return assistant.choices[0].message.content;
}

client.on('message', message => {
    console.log(message.body);
    runCompletion(message.body).then(result => message.reply(result));
});