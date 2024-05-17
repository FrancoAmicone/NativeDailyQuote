// components/AuthorCheckboxList.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotesData from '../data/data.json';

const AuthorCheckboxList = ({ navigation }) => {
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

  const toggleAuthorSelection = (author) => {
    setSelectedAuthors((prevSelectedAuthors) => {
      const newSelectedAuthors = prevSelectedAuthors.includes(author)
        ? prevSelectedAuthors.filter((a) => a !== author)
        : [...prevSelectedAuthors, author];
      AsyncStorage.setItem('selectedAuthors', JSON.stringify(newSelectedAuthors));
      return newSelectedAuthors;
    });
  };

  const handleConfirmSelection = () => {
    navigation.navigate('Home', { selectedAuthors });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quotesData.authors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => toggleAuthorSelection(item.name)}
          >
            <View style={styles.authorImage}>
              <Text style={styles.authorName}>{item.name}</Text>
            </View>
            <Text>{selectedAuthors.includes(item.name) ? '-' : '+'}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
        <Text style={styles.confirmButtonText}>Confirm Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  authorImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
  },
  authorName: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AuthorCheckboxList;
