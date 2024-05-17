// components/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    const getRandomQuote = () => {
      const authors = selectedAuthors.length
        ? quotesData.authors.filter((author) => selectedAuthors.includes(author.name))
        : quotesData.authors.filter((author) => author.name === "John Lennon");
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];
      return { quote: randomQuote, author: randomAuthor.name, image: randomAuthor.image };
    };
    setQuote(getRandomQuote());
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
      <Button
        title="Discover Authors"
        onPress={() => navigation.navigate('AuthorCheckboxList')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
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
  authorImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  quote: {
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
