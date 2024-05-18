import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotesData from '../data/data.json'; // Asegúrate de importar la data de citas

const Settings = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const scheduleNotification = async () => {
    const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
    const selectedAuthors = storedAuthors ? JSON.parse(storedAuthors) : [];
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");

    if (authors.length > 0) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Quote",
          body: `${randomQuote} - ${randomAuthor.name}`,
        },
        trigger: {
          hour: date.getHours(),
          minute: date.getMinutes(),
          repeats: true,
        },
      });
    }
  };

  const sendTestNotification = async () => {
    const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
    const selectedAuthors = storedAuthors ? JSON.parse(storedAuthors) : [];
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");

    if (authors.length > 0) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];

      await Notifications.presentNotificationAsync({
        content: {
          title: "Daily Quote",
          body: `${randomQuote} - ${randomAuthor.name}`,
        },
        trigger: null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Enable Notifications" onPress={scheduleNotification} />
      <Button title="Pick Time" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Button title="Send Test Notification" onPress={sendTestNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Settings;
