import React, { Component } from 'react';
import './App.css'
import TabList from "./Components/TabList"
import Body from "./Components/Body"
import Header from "./Components/Header"
import SimpleReactLightbox from 'simple-react-lightbox'
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebase = require('firebase');

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1
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
    },
    {
      id: 7,
      title: 'Add Movie'
    },
    {
      id: 8,
      title: 'Create List'
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
            <Body activeTab={this.state.activeTab}/>
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }
  
  componentDidMount() {
    firebase.initializeApp(config);
  }  
}
export default App;