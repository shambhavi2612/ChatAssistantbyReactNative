

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = ({ route }) => {
  const { primaryColor, chatAssistantImage, selectedBotImage } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = React.useState([]);

  const addInitialQuestion = () => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: previousMessages.length + 1,
          text: 'Please select from the list below:',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chat Assistant',
            avatar: chatAssistantImage,
          },
          quickReplies: {
            type: 'radio',
            values: [
              {
                title: 'What is React Native?',
                value: 'What is React Native?',
              },
              {
                title: 'What is JSX?',
                value: 'What is JSX?',
              },
              {
                title: 'How do I use state in React?',
                value: 'How do I use state in React?',
              },
              {
                title: 'What is Expo?',
                value: 'What is Expo?',
              },
              {
                title: 'No',
                value: 'No',
              },
            ],
          },
        },
      ])
    );
  };

  React.useEffect(() => {
    addInitialQuestion();
  }, []);

  const onSend = (newMessages = []) => {
    const newMessageText = newMessages[0].text;
    handleUserMessage(newMessageText, newMessages[0]._id);
  };

  const handleQuickReply = (replies) => {
    const [reply] = replies;
    handleUserMessage(reply.title, messages.length + 1);
  };

  const handleUserMessage = (text, messageId) => {
    // Add the user's selected question as a message from the user
    const userMessage = {
      _id: messageId,
      text: text,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessage])
    );

    // Generate the assistant's response
    let responseText = '';
    switch (text) {
      case 'What is React Native?':
        responseText = 'React Native is a framework for building native apps using React.';
        break;
      case 'What is JSX?':
        responseText = 'JSX is a syntax extension for JavaScript that looks similar to XML or HTML and is used with React to describe UI components.';
        break;
      case 'How do I use state in React?':
        responseText = 'State in React is used to manage dynamic data and allows components to be interactive.';
        break;
      case 'What is Expo?':
        responseText = 'Expo is a set of tools and services built around React Native to help you develop, build, and deploy apps quickly.';
        break;
      case 'No':
        responseText = 'Thank You ! Happy to assist you  ';
        break;
      default:
        responseText = 'I am not sure about that.';
    }

    const newMessage = {
      _id: messageId + 1,
      text: responseText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chat Assistant',
        avatar: chatAssistantImage,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );

    // Add initial question again if the user didn't select 'No'
    if (text !== 'No') {
      setTimeout(() => {
        addInitialQuestion();
      }, 1000); // delay to allow the current response to show first
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Chat Assistant</Text>
          {/* <View style={styles.chatAssistantContainer}>
            <Image source={{ uri: selectedBotImage }} style={styles.chatAssistantImage} />
          </View> */}
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          quickReplyStyle={{ borderRadius: 8 }}
          onQuickReply={(replies) => handleQuickReply(replies)}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: primaryColor,
                  },
                  left: {
                    backgroundColor: '#d3d3d3', // Light grey for the assistant's messages
                  },
                }}
              />
            );
          }}
          renderAvatar={(props) => {
            return <Avatar {...props} imageStyle={{ left: { width: 36, height: 36, borderRadius: 18 } }} />;
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#778899", // Use the primaryColor for the background
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 20,
    includeFontPadding:25
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24, // Increase font size for better visibility
    fontWeight: 'bold', // Make the back button text bold
    color: '#fff', // White color for contrast
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff', // White color for contrast
    textAlign: 'right',
  },
  chatAssistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAssistantImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10, // Add margin for spacing
  },
});

export default ChatScreen;



