import React from "react";
import { useState } from "react";

const SearchController = () => {
    const [filterData, setFilterData] = useState();

    const getListDataFromApi = async() => {
        await fetch('https://api.themoviedb.org/3/search/keyword?api_key=e9e9d8da18ae29fc430845952232787c&page=1&query=')
            .then(response => response.json())
            .then(json => {
                setFilterData(json)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        filterData, setFilterData, getListDataFromApi
    );
}
export default SearchController;