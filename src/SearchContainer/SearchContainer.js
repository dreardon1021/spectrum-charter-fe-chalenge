import React from "react";
import "./SearchContainer.css";
import "../App/App.css"

import SearchForm from "../SearchForm/SearchForm";
import FilterButtonContainer from "../FilterButtonContainer/FilterButtonContainer";

const SearchContainer = ({ filterData, formResetTable, allRestaurantData, updateCurrentSearchData, possibleRestaurantGenres, possibleRestaurantStates }) => {
  return (
    <section className="search-container">
      <SearchForm allRestaurantData={allRestaurantData} formResetTable={formResetTable} updateCurrentSearchData={updateCurrentSearchData} />
      <FilterButtonContainer
        allRestaurantData={allRestaurantData}
        filterData={filterData}
        possibleRestaurantStates={possibleRestaurantStates}
        possibleRestaurantGenres={possibleRestaurantGenres}
      />
    </section>
  );
};

export default SearchContainer;
