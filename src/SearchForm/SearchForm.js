import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }

  updateSearchState(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <form className="search-form">
        <input
          className="search-input"
          name="searchValue"
          placeholder="Search by name, city, or genre"
          onChange={e => this.updateSearchState(e)}
        />
        <button className="search-btn search-filter-btn" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
