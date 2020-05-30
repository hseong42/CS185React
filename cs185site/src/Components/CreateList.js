import React, { Component } from 'react';

const firebase = require('firebase');
const axios = require('axios');

export class CreateList extends Component {
	constructor() {
	    super();
	    this.state = {
		    list: ''
	    }
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault()
	  	const itemsRef = firebase.database().ref('lists');
	    itemsRef.child(this.state.list).set('');
		this.setState({
		    list: ''
		});
	}
	render() {
		return (
			<div className="inputBox">
				<div className="inputText">Enter the name of the list you want to create:</div>
				<form onSubmit={this.handleSubmit}>
			        <input type="text" name="list" placeholder="List Name" onChange={this.handleChange} value={this.state.list}/>
			        <button className="inputButton">Submit</button>
	            </form>
			</div>
		)
	}
}
export default CreateList;
