// components/DailyQuote.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import quotesData from '../data/data.json';

const DailyQuote = ({ selectedAuthors, interval, language }) => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const getRandomQuote = () => {
      const { authors } = quotesData;
      let filteredAuthors = authors;

      if (selectedAuthors && selectedAuthors.length > 0) {
        filteredAuthors = authors.filter((author) => selectedAuthors.includes(author.name));
      }

      const randomAuthor = filteredAuthors[Math.floor(Math.random() * filteredAuthors.length)];
      const randomQuote = randomAuthor.quotes[Math.floor(Math.random() * randomAuthor.quotes.length)];
      return { quote: randomQuote, author: randomAuthor.name, image: randomAuthor.image };
    };

    setQuote(getRandomQuote());

    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, parseInt(interval) * 3600 * 1000);

    return () => clearInterval(intervalId);
  }, [selectedAuthors, interval]);

  return (
    <View style={styles.container}>
      {quote && (
        <View style={styles.quoteContainer}>
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  quoteContainer: {
    alignItems: 'center',
  },
  authorImage: {
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    margin: 50,
    padding: 20,
    alignItems: 'center',
  },
  quote: {
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
});

export default DailyQuote;
