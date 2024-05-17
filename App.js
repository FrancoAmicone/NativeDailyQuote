// App.js (o App.jsx)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import AuthorCheckboxList from './components/AuthorCheckboxList';
import Settings from './components/Settings';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Daily Quote App' }} />
        <Stack.Screen name="AuthorCheckboxList" component={AuthorCheckboxList} options={{ title: 'Discover Authors' }} />
        <Stack.Screen name="Settings" component={Settings} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
