import React, { Component } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

const options = {
	enablePanzoom: false,
    autoplaySpeed: 0,
    showDownloadButton: false,
  };

export class Images extends Component {
	scrollToTop() {
		document.body.scrollTop = 0
	    document.documentElement.scrollTop = 0
		}
	render() {
		return (
			<div className='body'>
				<SRLWrapper options={options}>
					<div className="parent">
						<figure className="child portrait">
							<img src={require("./images/shoot2.jpg")}/>
						</figure>
						<figure className="child portrait">
							<img src={require("./images/shoot.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/target.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/arrowPull.jpg")} />
						</figure>
						<figure className="child">
							<img src={require("./images/outdoorRange.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/atLine.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/field.jpg")}/>
						</figure>
						<figure className="child portrait">
							<img src={require("./images/JOAD.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/At1.jpg")}/>
						</figure>
						<figure className="child">
							<img src={require("./images/AT2.jpg")}/>
						</figure>
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
export default Images