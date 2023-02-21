import React from "react";
import { useState } from "react";

const HomeControlller = () => {
  const [listData, setListData] = useState();
  
  const getListDataFromApi = async() => {
    await fetch('https://60f4d20e2208920017f39df5.mockapi.io/thi')
    .then(response => response.json())
    .then(json => {
      setListData(json)
      console.log(listData);
    })
    .catch(err => {
      console.error(err)
    });
  };
  return (
    listData, getListDataFromApi, setListData
  )


}
export default  HomeControlller;