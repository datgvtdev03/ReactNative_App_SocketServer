import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import HomeControlller from "./HomeController";

const config = {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 9,
};
const windowWidth = Dimensions.get('window').width;
  console.log("dai ", windowWidth);
  const windowHeight = Dimensions.get('window').height;
export default function HomeScreen({ navigation }) {
  
  const [isShowImage, setIsShowImage] = useState(false);

  const [listData, setListData] = useState();

  const getListDataFromApi = async () => {
    await fetch("https://60c7a3edafc88600179f5766.mockapi.io/listPhone")
      .then((response) => response.json())
      .then((json) => {
        setListData(json);
        console.log(listData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getListDataFromApi();
    console.log(getListDataFromApi);
  }, []);

  const dataDanhMuc = [
    {
      name: "Điện thoại",
      uri: require("../../../assets/smartphone.png"),
    },
    {
      name: "Laptop",
      uri: require("../../../assets/laptop.png"),
    },
    {
      name: "Đồng hồ",
      uri: require("../../../assets/watch.png"),
    },
    {
      name: "Máy tính bảng",
      uri: require("../../../assets/tablet.png"),
    },
    {
      name: "Phụ kiện",
      uri: require("../../../assets/headphones.png"),
    },
  ];

  const [list, setList] = useState(dataDanhMuc);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewHeader}>
          <Image
            source={require("../../../assets/KhongTen.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.textHeader}>Tech Store</Text>
        </View>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={false}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          <View style={{ flex: 10, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#00ABFD",
                height: 240,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  width: "90%",
                  height: 47,
                  alignSelf: "center",
                  marginTop: 11,
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
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: 11,
                    justifyContent: "center",
                  }}
                  placeholder="Tìm kiếm sản phẩm"
                  onFocus={() => {
                    navigation.navigate("Search");
                  }}
                />

              </View>
            </View>

            <View style={styles.viewDanhMucSP}>
              <FlatList
                nestedScrollEnabled
                horizontal={false}
                numColumns={3}
                data={dataDanhMuc}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: 100,
                      height: 120,
                      backgroundColor: "#CDF1FF",
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={item.uri}
                      style={{ width: 60, height: 60, marginBottom: 8 }}
                    />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
              />
            </View>

            <View style={styles.viewDanhMucFl}>
              <FlatList
                horizontal={false}
                contentContainerStyle={{
                  alignItems: "center",
                }}
                numColumns={2}
                data={listData}
                renderItem={({ item }) => (
                  // <View style={styles.viewItemData} >
                  <TouchableOpacity style={styles.viewItemData}
                  onPress={() => navigation.navigate('DetailCart', {item: item})}>
                  
                    <Image
                      source={{ uri: item.imagePhone}}
                      style={{ width: 130, height: 170, marginBottom: 8 }}
                    />
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ color: 'red' }}>{new Intl.NumberFormat("vi-VN", config).format(item.price)}</Text>
                  </TouchableOpacity>
                    
                  // </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },

  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 0,
    marginLeft: -5,
  },

  viewHeader: {
    flex: 1,
    backgroundColor: "#00ABFD",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 8,
  },

  viewDanhMucSP: {
    height: 300,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    top: 110,
    borderRadius: 29,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 22,
  },

  viewDanhMucFl: {
    // height: 300,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    bottom: -200,
    borderRadius: 29,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10
  },

  viewItemData: {
    width: (windowWidth - 100) / 2,
    height: 230,
    backgroundColor: "#E7E7E7",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
  },
});
