import React, { Component } from 'react';

const firebase = require('firebase');
const axios = require('axios');

export class AddMovie extends Component {
	constructor() {
	    super();
	    this.state = {
		    movie: ''
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
		let arr = []
	  	const itemsRef = firebase.database().ref('movies');
	  	axios.get("https://www.omdbapi.com/" , {
            params: {
                apikey: "b1800172",
                i: this.state.movie
            }
        })
        .then ( (response) => {
        	console.log(response)
	        arr.push({
	        	poster: response.data.Poster,
	            title: response.data.Title,
	            director: response.data.Director,
	            rating: response.data.imdbRating,
	            plot: response.data.Plot
	        })
	        itemsRef.child(this.state.movie).set(arr);
		  	this.setState({
		    	movie: ''
		  	});
        })
        .catch ( (error) => {
        	alert("IMDb ID is invalid. Please enter a valid IMDb ID.");
            console.log(error);
        })
	}
	render() {
		return (
			<div className="inputBox">
				<div className="inputText">Enter IMDb Tag of the Movie you want to add:</div>
				<form onSubmit={this.handleSubmit}>
			        <input type="text" name="movie" placeholder="IMDb Tag" onChange={this.handleChange} value={this.state.movie}/>
			        <button className="inputButton">Submit</button>
	            </form>
			</div>
		)
	}
}
export default AddMovie;
