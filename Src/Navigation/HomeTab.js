import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/Home/HomeScreen";
import CartScreen from "../Screen/Cart/CartScreen";
import AccScreen from "../Screen/Account/AccountScreen";

const Tab = createBottomTabNavigator();
export default function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Acc" component={AccScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}
