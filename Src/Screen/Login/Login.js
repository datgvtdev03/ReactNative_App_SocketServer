import React from "react";
import { StyleSheet, Text, View, Image, TextInput , TouchableOpacity, Alert} from 'react-native';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Login({navigation}) {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const validate = () => {
    var isCorrect = false;
    if(username == "A" && password == "a") {
      isCorrect = true;
    }
    if(isCorrect) {
      navigation.navigate('HomeTab', {
        user: {
          name: username,
          pass: password,
          fullName: "Giáp Văn Thành Đạt",
          msv: "PH20617",
        },
      })
      
    } else {
      Alert.alert("Đăng nhập không thành công");
    }
    
  }

  return (
    
      <View style={styles.container}>
        <View style={styles.inlineContainerTop}>
        <Image source={require('../../../assets/KhongTen.png')} style={{width: 300, height: 150, marginTop: 70}}/>
        <Text style={styles.innerText}>Chào mừng bạn đến với</Text>
        <Text style={styles.innerText1}>Tech Store</Text>


        <Text style = {styles.text}>ĐĂNG NHẬP</Text>
        <TextInput
        style = {styles.input}
        placeholder='Tài khoản'
        placeholderTextColor='#808080'
        onChangeText={(text) => {
          setUsername(text);
          console.log(username, "username")
        }}
        />

        <TextInput
        style = {styles.input}
        onChangeText={(text) => {
          setPassword(text);
          console.log(password, "password")
        }}
        placeholder="Mật khẩu"
        placeholderTextColor='#808080'
        secureTextEntry={true}
        keyboardType=""
        />

        <TouchableOpacity style={styles.button}
          onPress={() => {
            validate();
          }}>
          <Text style={{color: "#000000", alignSelf: 'center', fontSize: 20}}>Đăng nhập</Text>
        </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center',
    justifyContent: 'center',}}>
        <TouchableOpacity style={{marginTop: 20}}
          onPress={() => {}}>
          <Text style={{color: "#000000", alignSelf: 'center', fontSize: 12}}>Chưa có tài khoản?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{width: 256, height: 34, borderRadius: 20, backgroundColor: '#00ABFD', alignContent: 'center', justifyContent: "center",marginTop: 10}}
          onPress={() => {navigation.navigate('SingUpScreen')}}>
          <Text style={{color: "#ffffff", alignSelf: 'center', fontSize: 20}}>Đăng kí</Text>
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
  },

  inlineContainerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    backgroundColor: '#00ABFD',
    padding: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },

  text: {
    color: "while",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20
  },

  input: {
    width: '85%',
    height: 44,
    borderRadius: 10, 
    borderColor: '#c4c4c4', 
    backgroundColor: "white",
    borderWidth: 1, 
    paddingLeft: 8,
    marginTop: 20,
  },

  button: {
    marginTop: 30,
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