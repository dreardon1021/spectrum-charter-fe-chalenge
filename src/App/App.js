import React, { Component } from 'react'
import './App.css';

 class App extends Component {
   constructor() {
     super();
     this.state = {
       restaurantData: []
     }
   }

   componentDidMount() {
     fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      method: 'GET',
      headers: {
        'Authorization': 'Api-Key q3MNxtfep8Gt'
      }
     })
     .then(response => response.json())
     .then(data => this.setState({restaurantData: data}))
   }

  render() {
    return (
      <main>
        
      </main>
    );
  }
}

export default App;
