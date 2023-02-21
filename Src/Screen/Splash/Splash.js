import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";


export default function Splash({navigation}) {

  setTimeout(() => {
    navigation.replace('LoginScreen');
  }, 4000);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/techStore.png')}
       />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ABFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
