import React, { Component } from 'react';
import './SearchContainer.css';

import SearchForm from '../SearchForm/SearchForm'



class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return(
      <section className="search-container">
        <SearchForm />
      </section>
    )
  }
}

export default SearchContainer