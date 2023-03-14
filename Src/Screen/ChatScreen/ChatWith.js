import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Alert} from "react-native";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";


export default function ChatWithScreen(props) {
  const navigation = props.navigation;
  const item = props.route.params?.item;

  const [message, setMessage] = useState();
  const [count, setCount] = useState(0);

  const [vote1, setVote1] = useState(30);
  const [vote2, setVote2] = useState(30);

  const socket = io('http://192.168.0.192:3000');

  useEffect(() => {
    console.log("call user");

    socket.on("sendMess", (data) => {
      setMessage(data);
      setCount(count + 1);
    });

    socket.on("vote1", (vote1) => {
      setVote1(vote1);
    });
    socket.on("vote2", (vote2) => {
      setVote2(vote2);
    })

  }, [])

  const sendMessage = () => {
    console.log("call");
    socket.emit("sendMessage", "Gui tin nhan tu client cho sever")
  }

  const onVote1 = () => {
    socket.emit("vote1", vote1 + 5);
  }

  const onVote2 = () => {
    socket.emit("vote2", vote2 + 5);
  }
  
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
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>{message}-{count}</Text>
        </View>
      </View>

      <View style={{flex: 12, flexDirection: 'row', borderWidth: 1, width: 200, justifyContent: 'center', alignSelf: 'center'}}>

        <View style={{flexDirection: 'column', flex: 1, borderWidth: 1, marginRight: 5}}>

          <View style={{flex: 10, justifyContent: 'flex-end'}}>
              <View style={{backgroundColor: '#00FF00', height: vote1}}>
                <Text>{vote1}</Text>
              </View>
          </View>

          <View style={{flex: 1, backgroundColor: 'grey'}}>
            <TouchableOpacity
            style={{margin: 15,alignSelf: 'center' }}
            onPress={() => onVote1()}
            >
            <Image style={{width: 30, height: 30}} source={require('../../../assets/send-message.png')}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'column', flex: 1, borderWidth: 1}}>
          <View style={{flex: 10, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: '#0000FF', height: vote2}}>
              <Text>{vote2}</Text>
            </View>
          </View>

          <View style={{flex: 1, backgroundColor: 'red'}}>
            <TouchableOpacity
            style={{margin: 15,alignSelf: 'center' }}
            onPress={() => onVote2()}
            >
            <Image style={{width: 30, height: 30}} source={require('../../../assets/send-message.png')}/>
            </TouchableOpacity>
          </View>
        </View>


      </View>

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
          onPress={() => sendMessage()}
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
