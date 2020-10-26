import React, { Component } from "react";
import "./RestaurantTable.css";

class RestaurantTable extends Component {
  constructor({ dataToDisplay }) {
    super({ dataToDisplay });
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentPage: 1,
      restaurantsPerPage: 10
    };
  }

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }


  render() {
    let { currentPage, restaurantsPerPage } = this.state;

    currentPage = this.props.dataToDisplay.length < 10 ? 1 : currentPage
    if(this.state.currentPage !== currentPage) {
      this.setState({currentPage: 1})
    }

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = this.props.dataToDisplay.slice(
      indexOfFirstRestaurant,
      indexOfLastRestaurant
    );

    const renderRestaurants = currentRestaurants.map((restaurant, index) => {
      let restaurantGenres = restaurant.genre.split(",").join(", ");
      return (
        <tr className="restaurant-table-row" key={index}>
          <td className="restaurant-table-data-cell name-cell">
            {restaurant.name}
          </td>
          <td className="restaurant-table-data-cell city-cell">
            {restaurant.city}
          </td>
          <td className="restaurant-table-data-cell state-cell">
            {restaurant.state}
          </td>
          <td className="restaurant-table-data-cell telephone-cell">
            {restaurant.telephone}
          </td>
          <td className="restaurant-table-data-cell genre-cell">
            {restaurantGenres}
          </td>
        </tr>
      );
    });

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.dataToDisplay.length / restaurantsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number}>
          <button
            id={number}
            onClick={this.handleClick}
            className={(this.state.currentPage === number ? 'active ' : '') + "page-button cursor-pointer"}
          >
            {number}
          </button>
        </li>
      );
    });

    return this.props.dataToDisplay.length !== 0 ? (
      <section className="table-container">
        <h2 className="table-header">Available Restaurants</h2>
        <table className="restaurant-table">
          <tbody className="restaurant-table-body">{renderRestaurants}</tbody>
        </table>
        <ul className="page-numbers-container">{renderPageNumbers}</ul>
      </section>
    ) : (
      <section className="table-container error-container">
        <h2>No Restaurants Found in Search/Filter</h2>
      </section>
    );
  }
}

export default RestaurantTable;
