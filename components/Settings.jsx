// components/Settings.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import quotesData from '../data/data.json';

const Settings = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    const loadSelectedAuthors = async () => {
      const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
      if (storedAuthors) {
        setSelectedAuthors(JSON.parse(storedAuthors));
      }
    };
    loadSelectedAuthors();
  }, []);

  useEffect(() => {
    const loadNotificationTime = async () => {
      const storedTime = await AsyncStorage.getItem('notificationTime');
      if (storedTime) {
        setDate(new Date(storedTime));
      }
    };
    loadNotificationTime();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    AsyncStorage.setItem('notificationTime', currentDate.toISOString());
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const getRandomQuote = () => {
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];
    return { quote: randomQuote, author: randomAuthor.name };
  };

  const enableNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const storedTime = await AsyncStorage.getItem('notificationTime');
      const notificationTime = storedTime ? new Date(storedTime) : new Date();
      notificationTime.setSeconds(0);

      await Notifications.cancelAllScheduledNotificationsAsync();
      const { quote, author } = getRandomQuote();
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Quote by ${author}`,
          body: quote,
        },
        trigger: {
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes(),
          repeats: true,
        },
      });
    }
  };

  const sendTestNotification = async () => {
    const { quote, author } = getRandomQuote();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Quote by ${author}`,
        body: quote,
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button onPress={showDatePicker} title="Set Notification Time" />
      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>Notification Time: {date.toLocaleTimeString()}</Text>
      <Button onPress={enableNotifications} title="Enable Notifications" />
      <Button onPress={sendTestNotification} title="Send Test Notification" />
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
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Settings;
