import React from "react";
import "./SearchContainer.css";
import "../App/App.css"

import SearchForm from "../SearchForm/SearchForm";
import FilterButtonContainer from "../FilterButtonContainer/FilterButtonContainer";
import SortButtonsContainer from "../SortButtonsContainer/SortButtonsContainer"

const SearchContainer = ({ filterData, formResetTable, sortDisplayDataByState, sortDisplayDataByName, allRestaurantData, updateCurrentSearchData, possibleRestaurantGenres, possibleRestaurantStates, possibleRestaurantAttire }) => {
  return (
    <section className="search-container">
      <SearchForm allRestaurantData={allRestaurantData} formResetTable={formResetTable} updateCurrentSearchData={updateCurrentSearchData} />
      <FilterButtonContainer
        allRestaurantData={allRestaurantData}
        filterData={filterData}
        possibleRestaurantStates={possibleRestaurantStates}
        possibleRestaurantGenres={possibleRestaurantGenres}
        possibleRestaurantAttire={possibleRestaurantAttire}
      />
      <SortButtonsContainer
        sortDisplayDataByState={sortDisplayDataByState}
        sortDisplayDataByName={sortDisplayDataByName}
      />
    </section>
  );
};

export default SearchContainer;
