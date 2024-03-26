import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AiChatScreen = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const openAISummarizer = async () => {
    const apiKey = ""; // Replace "YOUR_API_KEY" with your actual OpenAI API key

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Log the response from the API
      const botResponse = data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        // { text: prompt, isUser: true },
        { text: botResponse, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, something went wrong. Please try again later.",
          isUser: false,
        },
      ]);
    }
  };

  const handleSend = () => {
    if (prompt.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: prompt, isUser: true }, // Update messages state with user's input
    ]);
    openAISummarizer(); // Call the function to get bot response
    setPrompt(""); // Clear the prompt
  };

  //   useEffect(() => {
  //     // Call the openAISummarizer function when the component mounts
  //     openAISummarizer();
  //   }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.isUser
                ? styles.userMessageContainer
                : styles.botMessageContainer,
            ]}>
            <Text style={styles.message}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={prompt}
          onChangeText={(text) => setPrompt(text)}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  chatContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  messageContainer: {
    maxWidth: "70%",
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#EDEDED",
  },
  message: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#008E97",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AiChatScreen;
