import React from "react";
import "./SearchContainer.css";

import SearchForm from "../SearchForm/SearchForm";
import FilterButtonContainer from "../FilterButtonContainer/FilterButtonContainer";

const SearchContainer = ({ updateCurrentSearchData, possibleRestaurantGenres, possibleRestaurantStates }) => {
  return (
    <section className="search-container">
      <SearchForm updateCurrentSearchData={updateCurrentSearchData} />
      <FilterButtonContainer
        possibleRestaurantStates={possibleRestaurantStates}
        possibleRestaurantGenres={possibleRestaurantGenres}
      />
    </section>
  );
};

export default SearchContainer;
