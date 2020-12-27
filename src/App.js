import './App.css';
import Details from './Components/details'
import React, { Component } from 'react'

 class App extends Component {

  constructor(){
    super();
    this.state={
      showListing : true 
    };
  }

  


  render() {
    return (
      <div>
        <Details />        
      </div>
    )
  }
}

export default App;