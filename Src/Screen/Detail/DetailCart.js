import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";

export default function DetailCart(props) {

  const navigation = props.navigation;
  const inforItem = props.route.params?.item;

  console.log("Gia Tri: ", JSON.stringify({props}));

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  const onAdd = () => {
    const newObj = {
      name: inforItem?.name,
      imagePhone: inforItem?.imagePhone,
      price: inforItem?.price,
      quantity: inforItem?.quantity,
      quantityBuy: inforItem?.quantityBuy,
      dependencies: inforItem?.dependencies
    }

    console.log("ssdsds: ", newObj);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObj)
    };
    fetch(
      "https://60c7a3edafc88600179f5766.mockapi.io/w",
      requestOptions
    )
      .then((response) => {
        response.json();
        if (response.status == 201 || response.status == 200) {
          console.log("Them thanh cong");
        }
        console.log("status: ", response.status);
      })
      .then((data) => {
        console.log("12345:", data);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Image 
        style={{width: '90%', height: '90%', borderRadius: 10}}
        source={{ uri: inforItem.imagePhone}}
        />
      </View>

      <View style={[styles.viewName, {paddingHorizontal: 15}]}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{inforItem.name}</Text>
        <Text style={{ color: 'red', fontSize: 20, fontWeight: '700', marginTop: 5 }}>{new Intl.NumberFormat("vi-VN", config).format(inforItem.price)}</Text>
        
      </View>

      <View style = {styles.lineStyle} />

      <View style={[styles.viewDetail, {alignItems: 'center', justifyContent: 'center'}]}>
        <View style={{borderWidth: 1, borderRadius: 5, width: '90%', height: '90%', borderColor: '#C4C4C4', padding: 10}}>
          <Text>{inforItem.dependencies}</Text>
        </View>
      </View>

      <View style={styles.viewButton}>
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd()}>
          <Text style={{color: 'white'}}>Thêm giỏ hàng</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, backgroundColor: 'red'}}>
          <TouchableOpacity style={styles.buttonBuy} onPress={() => {}}>
          <Text style={{color: 'white'}}>Mua ngay</Text>
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
    flexDirection: "column",
  },

  viewImage: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  viewName: {
    flex: 1,
  },

  viewDetail: {
    flex: 3,
  },

  viewButton: {
    flex: 0.7,
    backgroundColor: "green",
    flexDirection: 'row'
  },

  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
  },

  buttonAdd: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#A5A5A5',
    padding: 10,
    alignSelf: 'center', 
    justifyContent: 'center'
  },

  buttonBuy: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#00ABFD',
    padding: 10,
    alignSelf: 'center', 
    justifyContent: 'center'
  },
})