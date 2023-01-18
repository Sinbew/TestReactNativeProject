import React from "react";

import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../constants/route";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../LoginScreen/LoginScreen";
import TabScreen from "./TabScreen1";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: 400,
        },
      }}
    >
      <Tab.Screen name="Tab Screen" component={TabScreen} />
    </Tab.Navigator>
  );
}

const TestScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Test screen</Text>
      <Button title={"Go Back"} onPress={() => navigation.goBack()} />
      <MyTabs />
    </View>
  );
};

export default TestScreen;
