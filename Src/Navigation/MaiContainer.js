import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { io } from "socket.io-client";

import Login from "../Screen/Login/Login";
import Splash from "../Screen/Splash/Splash";
import SingUpScreen from "../Screen/Signup/Signup";
import HomeScreen from "../Screen/Home/HomeScreen";
import HomeTab from "./HomeTab";
import SearchScreen from "../Screen/Search/SearchScreeb";
import DetailCart from "../Screen/Detail/DetailCart";
import ChatScreen from "../Screen/ChatScreen/ChatScreen";
import ChatWithScreen from "../Screen/ChatScreen/ChatWith";
import ChatWithFr from "../Screen/ChatScreen/ChatWithFr";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainContainer() {
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"HomeTab"}>
          <Stack.Screen
            name={"SplashScreen"}
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"LoginScreen"}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"SingUpScreen"}
            component={SingUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
          <Stack.Screen name="HomeTab" component={HomeTab} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="DetailCart" component={DetailCart} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ChatWith" component={ChatWithScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="ChatWithFr" component={ChatWithFr}  options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

