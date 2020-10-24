import React, { Component } from "react";
import "./FilterButtonContainer.css";
import "../App/App.css"

class FilterButtonContainer extends Component {
  constructor({ possibleRestaurantStates, possibleRestaurantGenres }) {
    super({ possibleRestaurantStates, possibleRestaurantGenres });
    this.state = {
      currentGenreFilter: '',
      currentStateFilter: ''
    };
  }

  updateFiltersOnChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFilterForm(e) {
    e.preventDefault()
  }

  render() {
    return (
      <form className="filter-form">
        <div className="genre-state-select-container">
          <label for="select-genre" className="filter-headers">
            Select Genre:
          </label>
          <select onChange={e => this.updateFiltersOnChange(e)} className="filter-select" name="currentGenreFilter">
            <option value="">Please Select a Genre</option>
            {this.props.possibleRestaurantGenres.map(genre => {
              return <option value={genre}>{genre}</option>;
            })}
          </select>
        </div>
        <div className="genre-state-select-container">
          <label for="select-state" className="filter-headers">
            Select State:
          </label>
          <select onChange={e => this.updateFiltersOnChange(e)} className="filter-select" name="currentStateFilter">
            <option value="null">Please Select a State</option>
            {this.props.possibleRestaurantStates.map(state => {
              return <option value={state}>{state}</option>;
            })}
          </select>
        </div>
        <button onClick={e => this.submitFilterForm(e)} className="search-filter-btn cursor-pointer" type="submit">Filter</button>
      </form>
    );
  }
}

export default FilterButtonContainer;
