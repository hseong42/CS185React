import React, { Component } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import '../App.css'
const axios = require('axios');

const options = {
	enablePanzoom: false,
    autoplaySpeed: 0,
    showDownloadButton: false,
    disableWheelControls: true
  };

export class Movies extends Component {
	constructor(props) {
	    super(props);
	    this.componentDidMount = this.componentDidMount.bind(this)
	  }
	scrollToTop() {
		document.body.scrollTop = 0
	    document.documentElement.scrollTop = 0
		}
	render() {
		return (
			<div className='moviebody'>
				<SRLWrapper options={options}>
					<div className="movieParent">
 	              		{this.props.display.map((item) => {
					        return (
					        	<figure className="moviechild">
									<img className="movieimg" src={item.poster} alt={item.caption}/>
								</figure>
					        )
					      })}
          			</div>
				</SRLWrapper>

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
	}
}
export default Movies