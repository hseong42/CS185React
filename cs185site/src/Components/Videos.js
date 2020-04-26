import React, { Component } from 'react';

export class Videos extends Component {
	render() {
		return (
			<div className="parent">
				<div className="child portrait">
					<video controls>
						<source src={require("./videos/shoot.mp4")}/>
					</video>
				</div>
				<div className="child">
					<video controls>
						<source src={require("./videos/shooting.mp4")}/>
					</video>
				</div>
				<div className="child">
					<video controls>
						<source src={require("./videos/waterBalloon.mp4")}/>
					</video>
				</div>
			</div>
		);
	}
}
export default Videos;