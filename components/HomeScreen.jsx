// components/HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyQuote from './DailyQuote';

const HomeScreen = ({ navigation, route }) => {
  const { selectedAuthors, interval, language } = route.params || {};
  const [quoteInterval, setQuoteInterval] = useState(interval || '24');
  const [currentLanguage, setCurrentLanguage] = useState(language || 'en');

  useEffect(() => {
    if (interval) setQuoteInterval(interval);
    if (language) setCurrentLanguage(language);
  }, [interval, language]);

  const navigateToAuthorCheckboxList = () => {
    navigation.navigate('AuthorCheckboxList');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Daily Quote App!</Text>
      <DailyQuote selectedAuthors={selectedAuthors} interval={quoteInterval} language={currentLanguage} />
      <TouchableOpacity onPress={navigateToAuthorCheckboxList} style={styles.card}>
        <Ionicons name="book" size={24} color="black" style={styles.icon} />
        <Text style={styles.cardText}>Discover Authors</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSettings} style={styles.card}>
        <Ionicons name="settings" size={24} color="black" style={styles.icon} />
        <Text style={styles.cardText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
  },
});

export default HomeScreen;
