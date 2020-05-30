import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App.css'
import MovieBody from './MovieBody'
import SearchBar from './SearchBar'

const firebase = require('firebase');

export class Movies extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	menuTitle: 'All',
	    	idsAvail: false,
	    	ids:[],
		    display: [],
		    listNames: []
	    }
	    this.componentDidMount = this.componentDidMount.bind(this)
	    this.buttonClick = this.buttonClick.bind(this)
	    this.reload = this.reload.bind(this)
	    this.search = this.search.bind(this)
	  }

	scrollToTop() {
		document.body.scrollTop = 0
	    document.documentElement.scrollTop = 0
		}

	buttonClick(e) {
		this.setState((state, props) => {
			return {idsAvail: false};
		});
		let arr = []
		let title = e.target.textContent
		if (title === 'All') {
			let ref = firebase.database().ref('movies')
			ref.on('value', snapshot => {
				const data = snapshot.val()
				for (let item in data) {
					arr.push(item)
				}
				this.setState((state, props) => {
				  return {
				  	ids: arr,
					idsAvail: true};
					});
			});
		}
		 else {
		 	let ref = firebase.database().ref('listMovie')
			ref.orderByChild('0/list').equalTo(e.target.textContent).on("value", snapshot => {
			    const data = snapshot.val();
			    for (let item in data) {
			    	arr[arr.length] = data[item][0].movie
			    }
			    this.setState((state, props) => {
				  return {
				  	menuTitle: title,
				  	ids: arr,
					idsAvail: true};
					});
			});
		}
	}

	reload() {
		this.setState({
			menuTitle: 'All'
		})
	}

	search(name) {
		this.setState((state, props) => {
			return {idsAvail: false};
		});
		let arr = []
		const ref = firebase.database().ref('movies');
	  	ref.orderByChild('0/title').equalTo(name).on("value", function(snapshot) {
		    const data = snapshot.val();
		    for (let item in data) {
		    	arr.push(item)
		    }
		});
		this.setState((state, props) => {
				  return {
				  	ids: arr,
					idsAvail: true};
					});
		
	}

	render() {
		if (this.state.ids !== []) {
		      var movieComp = <MovieBody ids={this.state.ids} listNames={this.state.listNames} reload={this.reload}/>
		    } else {
		      var movieComp = null;
		    }
		return (
			<div className='moviebody'>
			<div className='top'>
			 	<DropdownButton id="dropdown-menu" title={this.state.menuTitle}>
			 		<Dropdown.Item as="button" onClick={this.buttonClick}>All</Dropdown.Item>
			 		{this.state.listNames.map((item) => {
					    return (
							<Dropdown.Item as="button" onClick={this.buttonClick}>{item}</Dropdown.Item>
					        )
					      })}
			 	</DropdownButton>
				<SearchBar search={this.search}/>
			</div>
				{movieComp}

				<button id="toTop" onClick={this.scrollToTop}>Go To Top</button>
			</div>
		);
	}

	componentDidMount() {
		window.addEventListener("scroll", scroll)
		function scroll() {
			var toTop = document.getElementById("toTop")
			if (toTop == null)
				return
			if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				toTop.style.display = "block"
			} else {
				toTop.style.display = "none"
			}
		}
		let ref = firebase.database().ref('movies')
		ref.on('value', snapshot => {
			let allMovies = []
			const data = snapshot.val()
			for (let item in data) {
				allMovies.push(item)
			}
			this.setState({
				ids: allMovies,
				idsAvail: true
			});
		});
	  	let listRef = firebase.database().ref('lists')
		listRef.on('value', snapshot => {
	  		let newLists=[];
	  		const data = snapshot.val()
		  	for (let item in data) {
		  		newLists.push(item);
		  	}
	  	this.setState({
	  		listNames: newLists
	  	});
	  });
	}

	componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.ids !== prevState.ids){
      //same code as above to retrieve the data 
    }
  }
}
export default Movies