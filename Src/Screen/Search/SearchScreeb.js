import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";
import { useState, useRef, useEffect } from "react";
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

export default function SearchScreen({ navigation }) {
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const textInputRef = React.useRef();
  useEffect(
    () => {
      if (textInputRef.current) {
        const unsubcride = navigation.addListener("focus", () => {
          textInputRef.current.focus();
        });
        return unsubcride;
      }
    },
    navigation,
    textInputRef.current
  );

  

  const getListDataFromApi = async (text) => {
    setIsLoading(true);
    await fetch(
      "https://api.themoviedb.org/3/search/keyword?api_key=e9e9d8da18ae29fc430845952232787c&page=1&query=" + text)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setFilterData(json.results);
        console.log(json.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
  // const formated = new Intl.NumberFormat('vi-VN', config).format(id);

  return (
    <View style={styles.container}>
      <View style={[styles.viewHeader, { flexDirection: "row" }]}>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeTab");
            }}
          >
            <Image
              style={{ width: 20, height: 20, marginLeft: 5 }}
              source={require("../../../assets/back.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 4, justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: "95%",
              height: 47,
              alignSelf: "center",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 20, height: 20, marginLeft: 16 }}
              source={require("../../../assets/search.png")}
            />

            <TextInput
              ref={textInputRef}
              style={{ width: "100%", height: "100%", marginLeft: 11 }}
              placeholder="Tìm kiếm sản phẩm"
              placeholderTextColor="#808080"
              onChangeText={(text) => getListDataFromApi(text)}
            />
          </View>
        </View>
      </View>

      <View style={styles.viewTabar}></View>

      <View style={styles.viewFlatlist}>
      {isLoading ?  <ActivityIndicator size="large" color="#00ff00" /> : null}
        <FlatList
          style={{ alignSelf: "center", width: "90%" }}
          data={filterData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemView}>
              <Text>{item.name}</Text>
              <Text style={{ color: "red" }}>{new Intl.NumberFormat('vi-VN', config).format(item.id)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    flexDirection: "column",
  },
  viewHeader: {
    flex: 1.8,
    backgroundColor: "#00ABFD",
  },
  viewTabar: {
    flex: 1.2,
    backgroundColor: "#CDF1FF",
  },
  viewFlatlist: {
    flex: 15,
    backgroundColor: "#CCCCCC",
  },
  itemView: {
    width: "98%",
    height: 80,
    backgroundColor: "#CDF1FF",
    margin: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
