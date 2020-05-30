import React, { Component } from 'react';

export class SearchBar extends Component {
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
	  	this.props.search(this.state.movie)
	  	this.setState({
	  		movie: ''
	  	})
	}
	render() {
		return (
			<div class="input-group">
			<form id="searchBar" className='searchBar' onSubmit={this.handleSubmit}>
				<input type='text' class="form-control width100" name='movie' placeholder='Search for a Movie' onChange={this.handleChange} value={this.state.name}></input>
				<span class="input-group-btn">
					<button class="btn btn-info" className="searchButton">Search</button>
				</span>
			</form>
			</div>
		)
	}

	componentDidMount() {
		this.setState({
  		movie: ''
  	});
	}

	componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      //same code as above to retrieve the data 
    }
  }
}
export default SearchBar;
