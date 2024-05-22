import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotesData from '../data/data.json';

const AuthorCheckboxList = ({ navigation }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [unlockedAuthors, setUnlockedAuthors] = useState([]);

  useEffect(() => {
    const loadSelectedAuthor = async () => {
      const storedAuthor = await AsyncStorage.getItem('selectedAuthor');
      if (storedAuthor) {
        setSelectedAuthor(storedAuthor);
      }
    };
    const loadUnlockedAuthors = async () => {
      const storedUnlockedAuthors = await AsyncStorage.getItem('unlockedAuthors');
      if (storedUnlockedAuthors) {
        setUnlockedAuthors(JSON.parse(storedUnlockedAuthors));
      }
    };
    loadSelectedAuthor();
    loadUnlockedAuthors();
  }, []);

  const toggleAuthorSelection = async (author) => {
    const selectedAuthorData = quotesData.authors.find(item => item.name === author);
    if (selectedAuthorData.locked && !unlockedAuthors.includes(author)) {
      alert('This author is locked. Watch an ad to unlock.');
      // Aquí se implementaría la lógica para mostrar la publicidad y desbloquear el autor.
      return;
    }

    if (selectedAuthor === author) {
      setSelectedAuthor('');
      await AsyncStorage.removeItem('selectedAuthor');
    } else {
      setSelectedAuthor(author);
      await AsyncStorage.setItem('selectedAuthor', author);
    }
  };

  const handleConfirmSelection = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quotesData.authors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              selectedAuthor === item.name && styles.selectedItemContainer,
              item.locked && !unlockedAuthors.includes(item.name) && styles.lockedItemContainer,
            ]}
            onPress={() => toggleAuthorSelection(item.name)}
          >
            <Image source={{ uri: item.image }} style={styles.authorImage} />
            <Text style={styles.authorName}>{item.name}</Text>
            {item.locked && !unlockedAuthors.includes(item.name) && <Text style={styles.lockedText}>Locked</Text>}
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
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  selectedItemContainer: {
    borderColor: 'black',
  },
  lockedItemContainer: {
    backgroundColor: '#d3d3d3',
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    marginLeft: 10,
    fontSize: 16,
  },
  lockedText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'red',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AuthorCheckboxList;
