// components/Settings.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Settings = ({ navigation }) => {
  const [interval, setInterval] = useState('24'); // Default interval in hours
  const [language, setLanguage] = useState('en'); // Default language

  const handleSaveSettings = () => {
    // Save the settings (e.g., to local storage or context)
    navigation.navigate('Home', { interval, language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <Text style={styles.label}>Quote Change Interval (hours):</Text>
      <RNPickerSelect
        onValueChange={(value) => setInterval(value)}
        items={[
          { label: '1 hour', value: '1' },
          { label: '6 hours', value: '6' },
          { label: '12 hours', value: '12' },
          { label: '24 hours', value: '24' },
        ]}
        value={interval}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Language:</Text>
      <RNPickerSelect
        onValueChange={(value) => setLanguage(value)}
        items={[
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
        ]}
        value={language}
        style={pickerSelectStyles}
      />

      <Button title="Save Settings" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
};

export default Settings;
