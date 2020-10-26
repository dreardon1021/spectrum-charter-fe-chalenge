import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Nav from "./Nav.js";
import "@testing-library/jest-dom";

describe("Nav", () => {
  it("should render what we expect", () => {
    const { getByText, getByTestId } = render(<Nav />);

    const navElement = getByTestId("nav");
    const headerElement = getByText("Restauraunt Locator");

    expect(navElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
  });

  it("should reset data when logo is clicked", () => {
    const mockLogoResetTable = jest.fn();

    const { getByText } = render(
      <Nav
        logoResetTable={mockLogoResetTable}
        allRestaurantData={[
          {
            address1: "501 Prince George St",
            attire: "business casual",
            city: "Williamsburg",
            genre: "American,Seafood,International,Asian,Cafe",
            hours: "Tue-Sat 10:00 AM-5:30 PM",
            id: "651628a1-9cea-4755-ac68-eaed5a0bb188",
            lat: "37.272483",
            long: "-76.707708",
            name: "A Chef's Kitchen",
            state: "VA",
            tags:
              "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,Seafood",
            telephone: "(757) 564-8500",
            website: "http://www.achefskitchen.biz",
            zip: "23185"
          }
        ]}
      />
    );

    const headerElement = getByText("Restauraunt Locator");

    fireEvent.click(headerElement)

    expect(mockLogoResetTable).toHaveBeenCalledWith([
      {
        address1: "501 Prince George St",
        attire: "business casual",
        city: "Williamsburg",
        genre: "American,Seafood,International,Asian,Cafe",
        hours: "Tue-Sat 10:00 AM-5:30 PM",
        id: "651628a1-9cea-4755-ac68-eaed5a0bb188",
        lat: "37.272483",
        long: "-76.707708",
        name: "A Chef's Kitchen",
        state: "VA",
        tags:
          "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,Seafood",
        telephone: "(757) 564-8500",
        website: "http://www.achefskitchen.biz",
        zip: "23185"
      }
    ])
  });
});
