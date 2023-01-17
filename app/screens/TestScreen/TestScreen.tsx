import React from 'react';

import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TestScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test screen</Text>
      <Button title={'Go Back'} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TestScreen;
