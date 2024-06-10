import React from "react";
import { StyleSheet, Platform} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RulesButton from "./src/pages/RulesButton";
import Home from "./src/pages/Home";
import RulesKeyboard from "./src/pages/RulesKeyboard";
import RulesWires from "./src/pages/RulesWires";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Button" component={RulesButton} />
            <Stack.Screen name="Fils" component={RulesWires} />
            <Stack.Screen name="Clavier" component={RulesKeyboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
