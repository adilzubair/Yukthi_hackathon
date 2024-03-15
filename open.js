const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { OpenAI } = require("openai")

require("dotenv").config();



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

      const thread = await openai.beta.threads.create();

      

      const threadMessages = await openai.beta.threads.messages.create(
        "thread_9aP7iqFLZQP49RrlYqa6gSQB",
        { role: "user", content: "How does AI work? Explain it in simple terms." }
      );
      const messages = await openai.beta.threads.messages.list(thread_id=thread.id)
      message_content = messages.data

      console.log(message_content   )
    
      //console.log(threadMessages);

      
       


      async function getRunOutput(threadId, runId) {
        let completed = false;
        let output = "";
        console.log(threadId)
        while (!completed) {
          try {
            // Check the run's status
            const run = await openai.beta.threads.runs.retrieve({
              thread_id: threadId,
              run_id: runId,
            });
      
            if (run.status === 'completed') {
              completed = true;
      
              // Retrieve the messages from the thread to get the output
              const messagesResponse  = await openai.beta.threads.messages.list({
                thread_id: threadId,
              });
              const messages = messagesResponse.data;
      
              // Assuming the output is in the last message
              output = messages[0].content; // Adjust based on your needs and response structure
              break;
            }
      
            // Wait a bit before checking again
            await delay(1000);
          } catch (error) {
            console.error("Error retrieving run output:", error);
            break; // Exit loop on error
          }
        }
      
        return output;
      }
      
      // Example usage
       // Ensure this is the correct run ID
      //getRunOutput(thread.id, run.id)
       // .then(output => console.log("Output:", output))
        //.catch(error => console.error("Error:", error));
      
      return "hello";
    }


runCompletion("hello").then(result => console.log(result));
