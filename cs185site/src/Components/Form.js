import React, { Component } from 'react';
import './Form.css'

const firebase = require('firebase')

class Form extends Component {
	constructor() {
	    super();
	    this.state = {
		    name: '',
		    description: '',
		    message: '',
		    private: null,
		    email: '',
		    time: null,
		    display: []
	    }
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Name
        if(this.state.name === ''){
           formIsValid = false;
           alert("Name cannot be empty.");
           return formIsValid;
        }

        if(this.state.name.length < 6){
            formIsValid = false;
            alert("Name must be longer than 5 letters.");
            return formIsValid;
        }

        if(this.state.name.length > 19){
            formIsValid = false;
            alert("Name must be shorter than 20 letters.");
            return formIsValid;
        }

        //Message
        if(this.state.message === ''){
           formIsValid = false;
           alert("Message cannot be empty.");
           return formIsValid;
        }

        if(this.state.message.length < 15){
            formIsValid = false;
            alert("Message must be longer than 15 characters.");
            return formIsValid;
        }

        if(this.state.message.length > 500){
            formIsValid = false;
            alert("Message must be shorter than 500 characters.");
            return formIsValid;
        }

        //Private
        if(this.state.private === null) {
        	formIsValid = false;
        	alert("Choose whether message will be private or public.")
        	return formIsValid;
        }

       return formIsValid;
   }

	handleSubmit(e) {
		e.preventDefault()
	  if(this.handleValidation()){
	  	const itemsRef = firebase.database().ref('messages');
		  const item = {
		    name: this.state.name,
		    description: this.state.description,
		    message: this.state.message,
		    private: this.state.private,
		    email: this.state.email,
		    time:  Date(firebase.database.ServerValue.TIMESTAMP)
		  }
		  itemsRef.push(item);
		  this.setState({
		    name: '',
			description: '',
			message: '',
			email: '',
			time:null
		  });
           alert("Form submitted");
        } 
	}

  	render() {
    	return (
      	<div className='app'>
        	<div className='container'>
	          	<div className='add-item'>
	          		<h2 align='center'> Enter Messages Here</h2>
	              		<form onSubmit={this.handleSubmit}>
			                <input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name}/>
			                <input type="text" name="description" placeholder="Give a short description of yourself." onChange={this.handleChange} value={this.state.description}/>
			                <input type="text" name="message" placeholder="What do you have to say?" onChange={this.handleChange} value={this.state.message}/>
			                <p>Would you like your message to be private?</p>
			                <input type="radio" id="yes" name="private" onChange={this.handleChange} value={true}/>
			                <label for="yes">Yes</label>
							<input type="radio" id="no" name="private" onChange={this.handleChange} value={false}/>
							<label for="no">No</label>
			                <input type="email" name="email" placeholder="If you want to be contacted, what's your email?" onChange={this.handleChange} value={this.state.email} />
			                <button>Send Message</button>
	              		</form>
	          	</div>
          	<div className='display-item'>
            	<div className='wrapper'>
              		<ul className='entry'>
	              		{this.state.display.map((item) => {
	              			if (item.private === "false") {
					        return (
					          <li key={item.id}>
					          	<p>{item.time}</p>
					            <h3>{item.name}</h3>
						        <p>{item.description}</p>
					            <p>Message: {item.message}</p>
					          </li>
					        )
					      }})}
              		</ul>
            	</div>
          	</div>
        	</div>
      	</div>
    );
  }
  componentDidMount() {
  	let ref = firebase.database().ref('messages')
  	ref.on('value', snapshot => {
  		let newState=[];
  		const data = snapshot.val()
	  	for (let item in data) {
	  		newState.push({
		        id: item,
		        name: data[item].name,
		        description: data[item].description,
		        message: data[item].message,
		        private: data[item].private,
		        email: data[item].email,
		        time: data[item].time
		      });
	  	}
  	this.setState({
  		display: newState
  	});
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
export default Form;