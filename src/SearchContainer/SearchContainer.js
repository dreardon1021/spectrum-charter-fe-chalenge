import React from "react";
import "./SearchContainer.css";

import SearchForm from "../SearchForm/SearchForm";

const SearchContainer = ({ updateCurrentSearchData }) => {
  return (
    <section className="search-container">
      <SearchForm updateCurrentSearchData={updateCurrentSearchData} />
    </section>
  );
};

export default SearchContainer;
