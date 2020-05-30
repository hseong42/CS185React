import React, { Component } from 'react';
import { Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import '../App.css'


const firebase = require('firebase');
export class Movies extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			loc: 8,
			show: false,
			idsavail: false,
			currentMovie: {	poster: '',
						    title: '',
					        director: '',
					        rating: '',
					        plot: ''
					    },
			lists: [],
	    	display: []
	    }
	    this.componentDidMount = this.componentDidMount.bind(this)
	    this.loadMovies = this.loadMovies.bind(this)
	    this.showModal = this.showModal.bind(this)
	    this.closeModal = this.closeModal.bind(this)
	    this.deleteMovie = this.deleteMovie.bind(this)
	    this.getMovies = this.getMovies.bind(this)
	  }

	loadMovies() {
		this.setState({
			idsavail: false
	  	});
		let newState = this.state.display
		let local = this.state.loc + 8
		if (local > this.props.ids.length) {
			local = this.props.ids.length
		}
		for (let id = this.state.loc; id < local; id++) {
			let key = this.props.ids[id]
		  	firebase.database().ref('/movies/' + key).once('value').then(function(snapshot) {
		  		let data = snapshot.val()
		  		console.log(data)
				newState.push({
				    id: key,
					poster: data[0].poster,
				    title: data[0].title,
			        director: data[0].director,
			        rating: data[0].rating,
			        plot: data[0].plot
				});
		  	})
		}
	 	this.setState({
			display: newState,
			loc: local,
			idsavail: true
	  	});
	  	if (this.state.idsavail === true) {
		  	var load = document.getElementById("load")
			if (this.state.loc < this.props.ids.length) {
				load.style.display = "block"
			} else if (this.state.idsavail === true){
				load.style.display = "none"
			}
		}
	}

	addList(item) {
		let arr = []
	  	const itemsRef = firebase.database().ref('listMovie');
	  	const id = this.state.currentMovie.id
	  	const list = item
	  	const key = item + id
	  	arr.push({
	        	list: list,
	            movie: id
	        })
		itemsRef.child(key).set(arr);
		this.props.reload()
	}

	deleteMovie() {
		console.log('deleteMovie')
		let movieRef = firebase.database().ref('/movies/' + this.state.currentMovie.id);
    	movieRef.remove()
    	this.setState({
    		show: false
    	});
    	let ref = firebase.database().ref('listMovie')
    	let movieid = this.state.currentMovie.id
		ref.orderByChild('0/movie').equalTo(movieid).on("value", function(snapshot) {
			let data = snapshot.val()
			for (let item in data) {
				let listid = data[item][0].list
				console.log(listid)
				let pairid = listid + movieid
				console.log(pairid)
				let listref = firebase.database().ref('listMovie/'+pairid);
		    	listref.remove()
		    }
		});
    	this.props.reload()
	}

	showModal(data) {
		this.setState({
			show: true,
			currentMovie: data
		});
		let ref = firebase.database().ref('listMovie')
		let arr = []
		let newarr = []
		ref.orderByChild('0/movie').equalTo(data.id).on("value", snapshot => {
			let data = snapshot.val()
			for (let item in data) {
		    	if(!arr.includes(data[item][0].list)) {
		    		arr.push(data[item][0].list)
		    	}
		    }
		    for (let item in this.props.listNames) {
		    	if (!arr.includes(this.props.listNames[item])) {
		    		newarr.push(this.props.listNames[item])
		    	}
		    }
		    this.setState({
		    	lists: newarr
		    })
		});
	}

	closeModal() {
		this.setState({
			show: false
		});
	}

	getMovies() {
		this.setState({
			idsavail: false
		})
		console.log("getMovies")
		console.log(this.props.ids)
		console.log(this.props.ids.length)
		let newState = []
		let local = 8
		if (local > this.props.ids.length) {
			local = this.props.ids.length
		}
		for (let id = 0; id < local; id++) {
			let key = this.props.ids[id]
		  	firebase.database().ref('/movies/' + key).once('value').then(snapshot => {
			  		let data = snapshot.val()
					newState.push({
					    id: key,
						poster: data[0].poster,
					    title: data[0].title,
				        director: data[0].director,
				        rating: data[0].rating,
				        plot: data[0].plot
					});
				this.setState({
				 	loc: local,
					display: newState,
					idsavail: true
			  	});
		  	})
		}
	  	var load = document.getElementById("load")
		if (local < this.props.ids.length) {
			load.style.display = "block"
		} else if (this.state.idsavail === true){
			load.style.display = "none"
		} else if (this.props.ids.length < 8) {
			load.style.display = "none"
		}
	}

	render() {
		return (	
			<div className="movieParent">
 	       		{this.state.display.map((item) => {
			        return (
				        <figure className="moviechild">
							<img className="movieimg" onClick={() => this.showModal(item)} src={item.poster} alt=''/>
						</figure>
				    )
			  })}
			  	<button id="load" onClick={this.loadMovies}>Load More</button>
			  	<Modal className='Modal' show={this.state.show} onHide={this.closeModal}>
			        <Modal.Header closeButton>
			        	<h3 className='ModalHeader'>{this.state.currentMovie.title}</h3>
			        </Modal.Header>
			        <Modal.Body className='ModalBody'>
			        	<img className='img-responsive' src={this.state.currentMovie.poster} alt=''/>
			        	<div className='MovieInfo'>
			        		<p>Summary: {this.state.currentMovie.plot}</p>
			        		<p>Director(s): {this.state.currentMovie.director}</p>
			        		<p>IMDb Rating: {this.state.currentMovie.rating}</p>
			        	</div>
			        </Modal.Body>
			        <Modal.Footer>
				        	<DropdownButton id="dropdown-menu" title='Add To List'>
						 		{this.state.lists.map((item) => {
								    return (
										<Dropdown.Item as="button" onClick={() => this.addList(item)}>{item}</Dropdown.Item>
								        )
								    })}
						 	</DropdownButton>
						<button variant="secondary" className='delete' onClick={this.deleteMovie}>Delete</button>
				        <button variant="secondary" onClick={this.closeModal}>
				            Close
				        </button>
			        </Modal.Footer>
			      </Modal>
          	</div>
		);
	}

	componentDidMount() {
		console.log(this.props.ids)
		let mounted = true;
		let newState = []
		let local = 8
		if (local > this.props.ids.length) {
			local = this.props.ids.length
		}
		for (let id = 0; id < local; id++) {
			let key = this.props.ids[id]
		  	firebase.database().ref('/movies/' + key).once('value').then(function(snapshot) {
		  		if (mounted) {
			  		let data = snapshot.val()
					newState.push({
					    id: key,
						poster: data[0].poster,
					    title: data[0].title,
				        director: data[0].director,
				        rating: data[0].rating,
				        plot: data[0].plot
					});
			  	}
		  	})
		}
	 	this.setState({
	 		loc: local,
			display: newState
	  	});
	  	var load = document.getElementById("load")
			if (this.state.loc < this.props.ids.length) {
			load.style.display = "block"
		} else {
			load.style.display = "none"
		}
		return () => mounted = false;
	}

	componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.props.ids !== prevProps.ids){
      //same code as above to retrieve the data 
      this.getMovies()
    } 
  }
}
export default Movies