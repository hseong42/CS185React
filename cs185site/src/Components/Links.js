import React, { Component } from 'react';

export class Links extends Component {
	scrollToTop() {
		document.body.scrollTop = 0
	    document.documentElement.scrollTop = 0
		}
	render() {
		return (
			<div className="linkBody">
				<h2> Additional Information: </h2>
					<div className="parentlist">
						<div className="childlist">
							<div className="list">
								<figure className="icon">
									<a href={"https://www.completeguidetoarchery.com/archery-for-beginners-how-to-get-started/"}>
										<img src={require("./images/CGtA.png")} alt=''/>
									</a>
								</figure>
								<p className="listtext">A good guide for beginners who wish to learn about archery that goes in depth into terminology, the options of a recurve and compound bow, gives recommendations for beginner equipment, and more.</p>
							</div>
						</div>
						<div className="childlist">
							<div className="list">
								<figure className="icon">
									<a href="https://www.archery360.com/where-to-shoot/">
										<img src={require("./images/A360.png")} alt=''/>
									</a>
								</figure>
								<p className="listtext">A database of archery ranges so you can find one nearby to shoot at, with additional options to clarify if you want a range that offers beginning classes. Also contains other articles on archery.</p>
							</div>
						</div>
					</div>
					<h2> Some Archery Centers or Equipment Sites: </h2>
					<div className="parentlist">
						<div className="childlist">
							<div className="list">
								<figure className="icon">
									<a href="https://performancearchery.net/">
										<img src={require("./images/PAlogo.png")} alt=''/>
									</a>
								</figure>
								<p className="listtext">Performance Archery is a San Diego archery location with a large indoor range that offers public beginner sessions with equipment provided for those who wish to learn. </p>
							</div>
						</div>
						<div className="childlist">
							<div className="list">
								<figure className="icon">
									<a href="https://hoyt.com/">
										<img src={require("./images/HoytLogo.jpg")} alt=''/>
									</a>
								</figure>
								<p className="listtext">Hoyt supplies archery equipment for both compound and recurve (as well as both target and hunting varieties for both) and is a good place to get quality equipment.</p>
							</div>
						</div>
						<div className="childlist">
							<div className="list">
								<figure className="icon">
									<a href="https://archerytag.com/">
										<img src={require("./images/ATLogo.png")} alt=''/>
									</a>
								</figure>
								<p className="listtext">A fun activity to play with multiple people that doesn't rely on any actual skill in archery to get your feet wet with the concept of shooting a bow while enjoying yourself with friends.</p>
							</div>
						</div>
					</div>

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
export default Links;