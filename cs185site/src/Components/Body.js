import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Links from './Links'
import Form from './Form'
import Movies from './Movies'
import AddMovie from './AddMovie'
import CreateList from './CreateList'
import Graph from './Graph'

export class Body extends Component {
	displayContent = () => {
		var activeTab = this.props.activeTab
		if(activeTab === 1)
			return <Home/>
		else if (activeTab === 2) 
			return <Images/>
		else if (activeTab === 3)
			return <Videos/>
		else if (activeTab === 4)
			return <Links/>
		else if (activeTab === 5)
			return <Form/>
		else if (activeTab === 6)
			return <Movies display={this.props.display}/>
		else if (activeTab === 7)
			return <AddMovie/>
		else if (activeTab === 8)
			return <CreateList/>
		else if (activeTab === 9)
			return <Graph/>
	}
	render() {
		return (this.displayContent());
	}
}
export default Body;
