import React, { Component } from "react";
import "./SortButtonsContainer.css";

class SortButtonsContainer extends Component {
  constructor({ sortDisplayDataByState, sortDisplayDataByName }) {
    super({ sortDisplayDataByState, sortDisplayDataByName });
    this.state = {
      sortByName: true,
      sortByState: false
    };
  }

  sortByState() {
    this.setState({ sortByName: false, sortByState: true }, () => {
      this.props.sortDisplayDataByState();
    });
  }

  sortByName() {
    this.setState({ sortByName: true, sortByState: false }, () => {
      this.props.sortDisplayDataByName();
    });
  }

  render() {
    return (
      <section className="sort-buttons-container">
        <button
          className={
            (this.state.sortByName === true ? "active " : "") +
            "sort-button cursor-pointer"
          }
          onClick={() => this.sortByName()}
        >
          Sort by Name
        </button>
        <button
          className={
            (this.state.sortByState === true ? "active " : "") +
            "sort-button cursor-pointer"
          }
          onClick={() => this.sortByState()}
        >
          Sort by State
        </button>
      </section>
    );
  }
}

export default SortButtonsContainer;
