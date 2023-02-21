import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";

export default function CartScreen({ navigation }) {
  const [listData, setListData] = useState();
  const [total, setTotal] = useState(0);
  const [totalPrice, setTalPrice] = useState(0);

  //khi chuyen vao man hinh thi bat dc su kien khi focus vao mh
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action
        console.log("thay doi man hinh");
        getListDataFromApi();
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);


  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  const onDelete = (deleteId) => {
    // b1: kiem tra xe id dc chon dung k
    // console.log("id duoc chon: ", deleteId);
    // b2: khoi tao ra mang rong
    const newList = new Array();
    //b3: duyet tung phan tu trong mang, neu element.id khac id dc chon de xoa thi minh push no vao mang moi
    listData.forEach((element) => {
      if (element.id != deleteId) {
        newList.push(element);
      }
    });
    // set lai data = newList;
    setListData(newList);
    setTotal(newList.length);

    // const newList = listData.filter(item => item.id !== deleteId);
    // console.log("xoa o day: ", newList);
    // setListData(newList);
  };

  const onDeleteFromApi = (idDelete) => {
    fetch("https://60c7a3edafc88600179f5766.mockapi.io/w" + "/" + idDelete, {
      method: "DELETE",
    })
      .then((json) => {
        console.log("removed");
        if (json.status == 200) {
          getListDataFromApi();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onUpdateItemFromApi = (item, isUpdate) => {
    
    if(isUpdate == true) {
      item.quantityBuy = item.quantityBuy + 1;
      console.log('statt: ', isUpdate);
    } else {
      if(item.quantityBuy <= 0) {
        Alert.alert('Khong the giam')
        return
      } else {
        item.quantityBuy = item.quantityBuy - 1;
      }
      console.log("status: ", isUpdate);
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    };
    fetch(
      "https://60c7a3edafc88600179f5766.mockapi.io/w/" + item.id,
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status == 200) {
          console.log("update thanh cong");
          getListDataFromApi();
        }
        console.log("status: ", response.status);
      })
      .then((data) => {
        console.log(data);
      });
  };

  const showAlert = (deleteId) => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn xóa thành phần này không?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => onDeleteFromApi(deleteId) },
      ],
      { cancelable: false }
    );
  };

  const getListDataFromApi = async () => {
    await fetch("https://60c7a3edafc88600179f5766.mockapi.io/w")
      .then((response) => response.json())
      .then((json) => {
        setListData(json);
        setTotal(json.length);

        var total1 = 0;
        json.forEach((element) => {
          var tongSoTien = element.quantityBuy * element.price;
          total1 = total1 + tongSoTien;
        });
        setTalPrice(total1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getListDataFromApi();
    console.log(getListDataFromApi);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.viewHeader, { flexDirection: "row" }]}>
        <View style={styles.viewButtonBack}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image
              style={styles.imageBack}
              source={require("../../../assets/back.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewTextInlineHeader}>
          <Text style={styles.viewTextHeader}>Giỏ hàng của tôi</Text>
        </View>
      </View>

      <View style={styles.viewCountSP}>
        <View style={{ flex: 1.5, justifyContent: "center", fontSize: 15 }}>
          <Text style={{ marginLeft: 8, fontWeight: "bold", fontSize: 15 }}>
            Tổng cộng:
          </Text>
        </View>

        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>{total} sản phẩm</Text>
        </View>
      </View>

      <View style={styles.viewListSP}>
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1, padding: 10 }}>
                <Image
                  style={{ width: 90, height: 90 }}
                  source={{ uri: item.imagePhone }}
                />
              </View>

              {/* tu day */}

              <View style={{ flex: 3, padding: 8 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 9 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => showAlert(item.id)}
                    >
                      <Text
                        style={{
                          color: "#4F4F4F",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={{ color: "red", fontSize: 15, marginVertical: 5 }}>
                  {new Intl.NumberFormat("vi-VN", config).format(item.price)}
                </Text>
                <Text style={{ color: "red", fontSize: 15, marginVertical: 5 }}>
                  {item.quantityBuy}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 5 }}>
                    <Text style={{ color: "#707070", fontSize: 12 }}>
                      Chỉ còn: {item.quantity} sản phẩm
                    </Text>
                  </View>

                  <View style={{ flex: 2, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#F7F7F7",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity onPress={() => onUpdateItemFromApi(item, false)}>
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          -
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#F7F7F7",
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 5,
                      }}
                    >
                      <Text>{item.quantityBuy}</Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: "#F7F7F7",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => onUpdateItemFromApi(item, true)}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.viewPrice}>
        <View style={{ flex: 2, justifyContent: "center", fontSize: 15 }}>
          <Text style={{ marginLeft: 8, fontWeight: "bold", fontSize: 15 }}>
            Tổng cộng:
          </Text>
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>
            {new Intl.NumberFormat("vi-VN", config).format(totalPrice)}
          </Text>
        </View>

        <View
          style={{ flex: 4, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              width: "70%",
              height: "60%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00ABFD",
            }}
            onPress={() => {
              Alert.alert("Đã làm đâu mà thanh toán được? Lmao");
            }}
          >
            <Text>Thanh toán</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1.5,
    backgroundColor: "#00ABFD",
  },
  viewButtonBack: {
    flex: 1,
    justifyContent: "center",
  },
  imageBack: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  viewTextInlineHeader: {
    flex: 10,
    justifyContent: "center",
  },
  viewTextHeader: {
    marginLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  viewCountSP: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
  },
  viewListSP: {
    flexDirection: "row",
    flex: 10,
    backgroundColor: "#F7F7F7",
  },

  viewPrice: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});
