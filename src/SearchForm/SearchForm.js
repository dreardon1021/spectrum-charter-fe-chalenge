import React, { Component } from 'react'
import './SearchForm.css'

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    }
  }

  render() {
    return(
      <form className="search-form">
        <input className="search-input" placeholder="Search by name, city, or genre" />
        <button classname="search-btn search-filter-btn" type="submit">Search</button>
      </form>
    )
  }
}

export default SearchForm