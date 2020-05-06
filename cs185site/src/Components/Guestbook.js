import React, { Component } from 'react';
import Form from './Form'
import '../App.css'

export class Guestbook extends Component {
	render() {
		return (
			<div>
				<div className='bookForm'>
					<Form/>
				</div>
				<div className='entries'> 
					{this.props.data && this.props.data.map((s, index) => (
			          <p> {s} </p>
			        ))} 
				</div>
			</div>
		);
	}
}
export default Guestbook;