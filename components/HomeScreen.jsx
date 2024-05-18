import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import quotesData from '../data/data.json';

const HomeScreen = ({ navigation }) => {
  const [quote, setQuote] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    const loadSelectedAuthors = async () => {
      const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
      if (storedAuthors) {
        setSelectedAuthors(JSON.parse(storedAuthors));
      } else {
        setSelectedAuthors(["John Lennon"]); // Default author if none selected
      }
    };
    loadSelectedAuthors();
  }, []);

  const getRandomQuote = () => {
    const authors = selectedAuthors.length
      ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
      : quotesData.authors.filter((author) => author.name === "John Lennon");

    if (authors.length === 0) return null;

    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    if (!randomAuthor.quotes || randomAuthor.quotes.length === 0) return null;

    const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];
    return { quote: randomQuote, author: randomAuthor.name, image: randomAuthor.image };
  };

  useEffect(() => {
    setQuote(getRandomQuote());
  }, [selectedAuthors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000); // Change quote every 10 seconds
    return () => clearInterval(interval);
  }, [selectedAuthors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Quotes</Text>
      {quote && (
        <ImageBackground
          source={{ uri: quote.image }}
          style={styles.authorImage}
          imageStyle={{ borderRadius: 400 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.quote}>"{quote.quote}"</Text>
            <Text style={styles.author}>- {quote.author}</Text>
          </View>
        </ImageBackground>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('AuthorCheckboxList')} style={styles.card}>
        <Ionicons name="book" size={24} color="black" style={styles.icon} />
        <Text style={styles.cardText}>Discover Authors</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.card}>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  authorImage: {
    width: 300,
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 1000,
    padding: 20,
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    top: 270,
  },
  quote: {
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    marginTop: 10,
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
