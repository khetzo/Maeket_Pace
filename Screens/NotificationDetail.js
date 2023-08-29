import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NotificationDetail = ({ route }) => {
  const { notification } = route.params;
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState([]);
  const replyInputRef = useRef(null);

  const handleSendReply = () => {
    if (replyText) {
      setMessages([...messages, { id: messages.length + 1, text: replyText }]);
      setReplyText('');
    }
  };

  const handleInputFocus = () => {
    replyInputRef.current.focus();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <View style={styles.container}>
        <View style={styles.notificationCard}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text>{notification.message}</Text>
        </View>
        <FlatList
          style={styles.messagesContainer}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.messageText}>{item.text}</Text>}
        />
        <View style={styles.replyContainer}>
          <TextInput
            ref={replyInputRef}
            style={styles.replyInput}
            value={replyText}
            onChangeText={setReplyText}
            placeholder="Reply..."
            onFocus={handleInputFocus}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendReply}>
            <FontAwesome name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
  },
  messagesContainer: {
    flex: 1,
  },
  messageText: {
    backgroundColor: '#E6E6E6',
    padding: 10,
    marginBottom: 6,
    borderRadius: 6,
  },
  replyContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationDetail;
