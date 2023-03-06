import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Alert} from "react-native";
import ChatScreen from "./ChatScreen";

export default function ChatWithScreen(props) {
  const navigation = props.navigation;
  const item = props.route.params?.item;
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flex: 1, backgroundColor: '#00ABFD', flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          >
          <Image style={{width: 20, height: 20}} source={require('../../../assets/back.png')}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 7,justifyContent: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>{item.name}</Text>
        </View>
      </View>

      <View style={{flex: 12}}></View>

      <View style = {styles.lineStyle} />
      <View style={{flex: 1.5, flexDirection: 'row'}}>
        <View style={{flex: 8}}>
          <TextInput
            style={styles.input}
            placeholder="Tin nhắn"
          />
        </View>
        
        <View style={{flex: 1}}>
        <TouchableOpacity
          style={{margin: 15,alignSelf: 'center' }}
          onPress={() => Alert.alert("Da gui")}
          >
          <Image style={{width: 30, height: 30}} source={require('../../../assets/send-message.png')}/>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#666666'
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:1,
  },
})
