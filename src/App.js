import './App.css';
import Details from './components/details'
import Listing from "./components/listing-page/Listing";
import React, { Component } from 'react'

class App extends Component {

  constructor(){
    super();
    
    this.state={
      showListing:true 
    };
  }
  
  componentDidMount() {
    const self = this;
    window.addEventListener('hashchange', function() {
      console.log('The hash has changed!')
      self.setPath();
    }, false);
    this.setPath();
  }

  setPath = () => {
    const currURL = window.location.href.split('#');
    if(currURL.length > 1) {
      if(currURL[1].includes('details')) {
        this.setState({ showListing : false });
      }
      else{
        this.setState({showListing :true});
      }
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.showListing ?
            <Listing />
          :
            <Details bookName="The Alchemist" author="Paulo Coelho" year="2006"/>
        }
      </div>
    );
  }
}

export default App;
