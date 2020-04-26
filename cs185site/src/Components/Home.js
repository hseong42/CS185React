import React, { Component } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

const options = {
	enablePanzoom: false,
    autoplaySpeed: 0,
    showDownloadButton: false,
  };

export class Home extends Component {
	render() {
		return (
			<SRLWrapper options={options}>
				<div className="main-body">
					<div className="homeimage">
						<img src={require("./images/targets.jpg")}/>
					</div>
					<div>
						<h2>About this Site</h2>
						<p>
							Archery is a sport that most people still find more unique than commonplace, which leads to the lack of clubs or organizations centered around it in some areas.  Despite that, it's a sport that found a spot in my heart and one that I enjoy over all others.
						</p>
						<p>
							Through sharing pictures and videos of exciting moments I've experienced through archery, I hope other people will grow interested in the sport and try it out!  And if things turn out well, they might enjoy it just as much as I do!
						</p>
					</div>
				</div>
			</SRLWrapper>
		);
	}
}
export default Home;