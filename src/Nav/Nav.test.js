import React from 'react'
import  { render } from '@testing-library/react';
import Nav from './Nav.js';

describe ('Nav', () => {
  it ('should render what we expect', () => {
    const { getByText, getByTestId } = render(<Nav />)

    const navElement = getByTestId("nav")
    const headerElement = getByText("Restauraunt Locator")

    expect(navElement).toBeInTheDocument()
    expect(headerElement).toBeInTheDocument()
  })

})