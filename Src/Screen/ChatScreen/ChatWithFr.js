import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { io } from "socket.io-client";


const socket = io('http://192.168.1.34:3000');

const ChatWithFr = (props) => {
  const navigation = props.navigation;
  const item = props.route.params?.item;

  const [message, setMessage] = useState([]);
  const [listMess, setListMess] = useState([])
  const arr = [];


  useEffect(() => {
    socket.on('chat1', (mess) => {
      arr.push(mess);
      setListMess(arr)
      console.log("a: " + listMess);
    });
  }, [])

  const onSendMess = () => {
    socket.emit('sendMess', message)
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.receiverInfo}>
          <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          >
            <Ionicons name="chevron-back-outline" size={34} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <View>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  marginHorizontal: 10,
                }}
                source={{
                  uri: item.avatar,
                }}
              />
              <View style={styles.greenDot}></View>
            </View>
            <View style={{ height: 45, justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
              <Text
                style={{ fontSize: 12, fontWeight: "500", color: "#757575" }}
              >
                Hoạt động {item.age} phút trước
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Feather name="phone" size={26} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="video" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="info" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* code form chat o day  */}
      <View style={styles.conversationView}>
        <FlatList
          data={listMess}
          renderItem={({item}) => 
            <View style={{padding: 10}}>
              <Text style={{backgroundColor: '#E0EEE0', margin: 2, padding: 5, borderRadius: 10}}>{item}</Text>
            </View>
          }
          keyExtractor={(item) => {}}
        />
        
      </View>

      <KeyboardAvoidingView
        style={styles.inputRow}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputArea}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#0685FA",
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  marginLeft: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 4,
                }}
              >
                <Fontisto name="camera" size={22} color="white" />
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Message..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{
                paddingLeft: 10,
                width: 260,
                height: 40,
              }}
              autoCorrect={false}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              onPress={() => onSendMess()}
              >
              <Text style={{padding:10, color:'#0685FA', fontSize:18, fontWeight:'600'}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatWithFr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  titleRow: {
    flex: 1.6,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  receiverInfo: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    width: 130,
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  greenDot: {
    backgroundColor: "#56CA37",
    width: 11,
    height: 11,
    position: "absolute",
    left: 38,
    top: 28,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#FFF",
  },

  conversationView: {
    flex: 12,
    borderColor: "#DBDBDB",
    borderTopWidth: 1,
  },

  inputRow: {
    flex: 2,
    justifyContent: "center",
  },
  inputArea: {
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
    marginHorizontal: 15,
    borderRadius: 40,
  },
  inputIconsContainer: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-around",
    width: 120,
  },


  messages: {
    flex: 1,
    padding: 20,
  },
  message: {
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
  },
});
