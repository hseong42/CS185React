import React, { Component } from 'react';
import './App.css'
import TabList from "./Components/TabList"
import Body from "./Components/Body"
import Header from "./Components/Header"
import SimpleReactLightbox from 'simple-react-lightbox'

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
            />
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }

  
}
export default App;