import React, { Component } from 'react';
import './App.css'
import TabList from "./Components/TabList"
import Body from "./Components/Body"
import Header from "./Components/Header"
import SimpleReactLightbox from 'simple-react-lightbox'
import config from "./config"

const firebase = require('firebase')

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1,
      data: []
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
            data={this.state.data}/>
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }

  componentDidMount(){
    firebase.initializeApp(config)
    let ref = firebase.database().ref('messages')
    ref.on('value', snapshot => {
      const storedData = snapshot.val()
      this.setState({data: storedData})
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      //same code as above to retrieve the data 
    }
  }
}
export default App;