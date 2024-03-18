"use client";
import { LuSendHorizonal } from "react-icons/lu";
import OpenAI from "openai";
import { useState } from "react";

// const openai = new OpenAI({
//   // apiKey: "", // Use environment variable for API key
//   // dangerouslyAllowBrowser: true,
// });

const Page = () => {
  const [message, setMessage] = useState([]);
  const [conversation, setConversation] = useState([]);
  const ArrayMessage = [{ role: "assistant", content: message }];

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // async function uploadtogpt(filePath) {
  //   const fileStream = fs.createReadStream(filePath);

  // }

  // const handleFileChange = async (event) => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     try {
  //       // Convert the File object to a format suitable for the OpenAI API
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("purpose", "answers");

  //       // Note: Directly uploading files like this exposes your API key in client-side code.
  //       // You should instead send the formData to your own server, which then securely interacts with the OpenAI API.
  //       console.log("File ready for secure upload through your server");

  //       // Example: await axios.post('/your-server-endpoint', formData);
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };

  const handleSendClick = async () => {
    // Append the new user message to the conversation
    const updatedConversation = [
      ...conversation,
      { role: "user", content: message },
    ];

    // Call the OpenAI API with the updated conversation
    const chatCompletion = await openai.chat.completions.create({
      messages: ArrayMessage,
      model: "gpt-3.5-turbo",
    });
    console.log(chatCompletion);
    const responseText = chatCompletion.choices[0].message.content;
    console.log(responseText);

    // Update conversation with both the new message and the response
    setConversation([
      ...updatedConversation,
      { role: "assistant", content: responseText },
    ]);

    // Clear the input field
    setMessage("");
  };

  return (
    <div className="border border-l-rose-100 h-screen">
      {/* <input type="file" name="file" id="file" onChange={handleFileChange} />      */}
      {/* <button onClick={() => console.log("axios")}>file upload</button> */}
      {/* <button onClick={handleSendClick}>upload me</button> */}
      <div className="border-red-500 h-[80%] overflow-y-scroll">
        Welcome:
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={msg.role == "user" ? "text-green-500" : "text-red-500"}
          >
            {msg.role}: {msg.content}
          </div>
        ))}
      </div>
      <div className="absolute w-full flex items-center justify-center bottom-5 ">
        <textarea
          className="text-black resize-none w-[500px]"
          value={message}
          onChange={handleInputChange}
          rows={2}
          columns={1}
        />
        <button onClick={handleSendClick}>
          <LuSendHorizonal size={25} className="ml-2 " color="white" />
        </button>
      </div>
    </div>
  );
};

export default Page;
