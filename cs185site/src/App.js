import React, { Component } from 'react';
import './App.css'
import TabList from "./Components/TabList"
import Body from "./Components/Body"
import Header from "./Components/Header"
import SimpleReactLightbox from 'simple-react-lightbox'

const axios = require('axios');

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1,
      display: []
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }

  render() {
    const tabs = [
    {
      id: 1,
      title: 'Home'
    },
    {
      id: 2,
      title: 'Gallery'
    },
    {
      id: 3,
      title: 'Videos'
    },
    {
      id: 4,
      title: 'Links'
    },
    {
      id: 5,
      title: 'Guestbook'
    },
    {
      id: 6,
      title: 'Movies'
    }
    ]
    return (
      <div className="body">
        <SimpleReactLightbox>
          <div className="header">
            <Header activeTab={this.state.activeTab}/>
          </div>
          <div className="nav-bar">
            <TabList tabs={tabs} 
            activeTab={this.state.activeTab}
            changeTab={this.changeTab}/>
          </div>
          <div className="main-body">
            <Body activeTab={this.state.activeTab}
            display={this.state.display}
            />
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }

  componentDidMount()  {
    const IMDbs = ['tt9541602', 'tt0120762', 'tt0317705', 'tt5700672', 'tt0441773', 
            'tt0848228', 'tt0097814', 'tt5323662', 'tt0110357','tt0364569','tt0364385'];
    let arr = [];
    IMDbs.forEach(element => 
      axios.get ('https://www.omdbapi.com/',{
      params: {
        apikey: "b1800172",
        i: element
      }
    })
      .then((response) => {
      var caption = "Title: " + response.data.Title + "\nDirected by: "
          +response.data.Director+"\nRating: "
          +response.data.imdbRating;
        arr.push({
            poster: response.data.Poster,
            title: response.data.Title,
            director: response.data.Director,
            rating: response.data.imdbRating,
            caption: caption
          });
      })
      .catch((error) => {
        console.log(error)
      })
    );
    this.setState({
        display: arr
      });
}
  
}
export default App;