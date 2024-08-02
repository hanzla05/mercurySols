import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Person = mongoose.model('Person', personSchema);

export default Person



// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const navigateToDetails = () => {
    const action = StackActions.push('Details');
    navigation.dispatch(action);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={navigateToDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;