import React, { Component } from 'react';

export class Header extends Component {
	displayContent = () => {
		var activeTab = this.props.activeTab
		if(activeTab === 1)
			return (<h1 align="center">Home Page</h1>)
		else if (activeTab === 2) {
			return (
				<div>
					<h1 align="center">Gallery</h1>
					<div class ="bodyproj" align="center">
						<p>
							Here are a couple pictures depicting fun times I've had and watched other people have through archery!
						</p>
					</div>
				</div>
				)
		}
		else if (activeTab === 3)
			return (
				<div>
					<h1 align="center">Videos</h1>
					<div class ="bodyproj" align="center">
						<p>
							These are a couple videos of shots I made or recorded other people making.
						</p>
					</div>
				</div>)
		else if (activeTab === 4)
			return (
				<div>
					<h1 align="center">Additional Links</h1>
					<div class ="bodyproj" align="center">
						<p>
							Here are a few additional links that lead to more in depth information about archery and some options on where to go to learn/buy equipment if you want to get started!
						</p>
					</div>
				</div>)
	}
	render() {
		return (this.displayContent());
	}
}
export default Header;
