import React from "react";
import { StyleSheet, Text, View, Image, TextInput , TouchableOpacity, Alert} from 'react-native';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function SingUpScreen({navigation}) {

  return (
    
      <View style={styles.container}>

        <View style={styles.inlineContainerTop}>

        <Image source={require('../../../assets/KhongTen.png')} style={{width: 300, height: 150, marginTop: 50}}/>

        <Text style={styles.innerText}>Chào mừng bạn đến với</Text>
        <Text style={styles.innerText1}>Tech Store</Text>
        <Text style = {styles.text}>ĐĂNG KÍ</Text>

        <TextInput
        style = {styles.input}
        placeholder='Tên đăng nhập'
        placeholderTextColor='#808080'
        onChangeText={() => {}}/>

        <TextInput
        style = {styles.input}
        placeholder='Họ và tên'
        placeholderTextColor='#808080'
        onChangeText={() => {}}/>

        <TextInput
        style = {styles.input}
        placeholder='Email'
        placeholderTextColor='#808080'
        onChangeText={() => {}}/>
      

        <TextInput
        style = {styles.input}
        onChangeText={(text) => {}}
        placeholder="Mật khẩu"
        placeholderTextColor='#808080'
        secureTextEntry={true}
        keyboardType=""/>

        <TextInput
        style = {styles.input}
        onChangeText={(text) => {}}
        placeholder="Nhập lại mật khẩu"
        placeholderTextColor='#808080'
        secureTextEntry={true}
        keyboardType=""/>

        </View>

        <View style={{alignItems: 'center',justifyContent: 'center',}}>
        <TouchableOpacity style={{width: 256, height: 44, borderRadius: 20, backgroundColor: '#00ABFD', alignContent: 'center', justifyContent: "center",marginTop: 20}}
          onPress={() => {}}>
          <Text style={{color: "white", alignSelf: 'center', fontSize: 20}}>Đăng kí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}
          onPress={() => {navigation.navigate('LoginScreen')}}>
          <Text style={{color: "#000000", alignSelf: 'center', fontSize: 12, textDecorationLine: 'underline'}}>Đăng nhập</Text>
        </TouchableOpacity>

        </View>

        
        
        <StatusBar style="auto" />
    </View>
  );
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // padding: 20,
    // justifyContent: 'center',
  },

  inlineContainerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    backgroundColor: '#00ABFD',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 10
  },

  text: {
    color: "while",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15
  },

  input: {
    width: "85%",
    height: 44,
    borderRadius: 10, 
    borderColor: '#c4c4c4', 
    backgroundColor: "white",
    borderWidth: 1, 
    paddingLeft: 8,
    marginTop: 10,
  },

  button: {
    marginTop: 20,
    width: 256, 
    height: 44,
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  innerText: {
    color: 'white',
    fontSize: 15,
    marginTop: -10
  },
  innerText1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white',
  },
  cssButton: {
    fontSize: 12,
  }
});