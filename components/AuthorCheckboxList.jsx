// components/AuthorCheckboxList.jsx

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import quotesData from '../data/data.json';

const AuthorCheckboxList = ({ navigation }) => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const toggleAuthorSelection = (author) => {
    setSelectedAuthors((prevSelectedAuthors) =>
      prevSelectedAuthors.includes(author)
        ? prevSelectedAuthors.filter((a) => a !== author)
        : [...prevSelectedAuthors, author]
    );
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
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleAuthorSelection(item.name)}
            >
              {selectedAuthors.includes(item.name) && <View style={styles.checked} />}
            </TouchableOpacity>
            <Text style={styles.authorName}>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Confirm Selection" onPress={handleConfirmSelection} />
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
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  authorName: {
    fontSize: 16,
  },
});

export default AuthorCheckboxList;
