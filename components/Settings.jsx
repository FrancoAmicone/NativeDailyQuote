// components/Settings.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import quotesData from '../data/data.json';

const Settings = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

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
    saveNotificationTime(currentDate);
    scheduleNotification(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const saveNotificationTime = async (time) => {
    await AsyncStorage.setItem('notificationTime', time.toString());
  };

  const scheduleNotification = async (time) => {
    const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
    const selectedAuthors = storedAuthors ? JSON.parse(storedAuthors) : [];
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");

    if (authors.length > 0) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];

      await Notifications.cancelAllScheduledNotificationsAsync();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Quote",
          body: `${randomQuote} - ${randomAuthor.name}`,
        },
        trigger: {
          hour: time.getHours(),
          minute: time.getMinutes(),
          repeats: true,
        },
      });
    }
  };

  const sendTestNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions not granted to show notifications');
      return;
    }

    const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
    const selectedAuthors = storedAuthors ? JSON.parse(storedAuthors) : [];
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");

    if (authors.length > 0) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];

      console.log('Scheduling test notification:', `${randomQuote} - ${randomAuthor.name}`);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Quote",
          body: `${randomQuote} - ${randomAuthor.name}`,
        },
        trigger: { seconds: 1 },
      });
    } else {
      console.log('No authors found for test notification');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View>
        <Button onPress={showTimepicker} title="Set Notification Time" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Send Test Notification"
          onPress={sendTestNotification}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Settings;
