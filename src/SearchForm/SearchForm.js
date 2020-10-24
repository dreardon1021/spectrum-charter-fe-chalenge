import React, { Component } from "react";
import "./SearchForm.css";
import "../App/App.css"

class SearchForm extends Component {
  constructor({ updateCurrentSearchData, formResetTable, allRestaurantData }) {
    super({ updateCurrentSearchData, formResetTable, allRestaurantData });
    this.state = {
      searchValue: ""
    };
  }

  updateSearchState(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.resetOnInputDelete(e)
    });
  }

  resetOnInputDelete(e) {
    if (e.target.value === '') {
      this.props.formResetTable(this.props.allRestaurantData)
    }
  }

  submitSearchForm(e) {
    e.preventDefault();
    let searchQuery = this.state.searchValue;
    this.props.updateCurrentSearchData(searchQuery)
  }

  render() {
    return (
      <form className="search-form">
        <input
          className="search-input"
          name="searchValue"
          value={this.state.searchValue}
          placeholder="Search by name, city, or genre"
          onChange={e => this.updateSearchState(e)}
        />
        <button
          onClick={e => this.submitSearchForm(e)}
          className="cursor-pointer search-filter-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
