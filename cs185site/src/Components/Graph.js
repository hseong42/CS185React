import React, { Component } from 'react';
const firebase = require('firebase');
var d3 = require("d3");


export class Graph extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			stateNodes: [],
			stateLinks: []
	    }
	    this.componentDidMount = this.componentDidMount.bind(this)
	  }
	drag = (simulation) => {
		function dragStarted(d) {
			if(!d3.event.active) {
			    simulation.alpha(.5);
			    simulation.alphaTarget(0.1).restart();
			}
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragEnded(d) {
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return d3.drag()
			.on("start", dragStarted)
			.on("drag", dragged)
			.on("end", dragEnded);
	}

	chart(nodes, links) {
		const width = 1920;
		const height = 900;

		const obj_links = links.map(d => Object.create(d));
		const obj_nodes = nodes.map(d => Object.create(d));

		const svg = d3.create("svg")
			.attr("viewBox", [0, 0, width, height]);

		const link = svg.append('g')
			.attr('stroke', '#999')
			.attr("stroke-opacity", 0.6)
			.selectAll("line")
			.data(obj_links)
			.join("line")
			.attr("stroke-width", d => Math.sqrt(d.value));

		const color = (node) => {
			if (node.group == 1)
				return d3.color("blue");
			return d3.color("pink");
		}

		const radius = (node) => {
			if (node.group == 1)
				return 60;
			return 20;
		}

		const simulation = d3.forceSimulation(obj_nodes)
			.force("link", d3.forceLink().links(links).id(d => { return d.index;}).distance(200))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width/2, height/2));

		var defs = svg.append('svg:defs');

		nodes.forEach(function(d, i) {
			defs.append("svg:pattern")
			    .attr("id", d.name.split(' ').join(''))
			    .attr("width", "100%")
			    .attr("height", "100%")
			    .attr("viewBox", "0 0 1 1")
			    .attr("patternUnits", "objectBoundingBox")
			    .append("svg:image")
			    .attr("width", "1.75")
			    .attr("height", "1.75")
			    .attr("xlink:href", d.poster)
			    .attr("x", -0.35)
			    .attr("y", -0.15);
		})

		const node = svg.append('g')
			.attr('stroke', '#fff')
			.attr("stroke-opacity", 1.5)
			.selectAll("circle")
			.data(obj_nodes)
			.join("circle")
			.attr("r", radius)
			.attr("fill", color)
			.style("fill", function(d) {
				if (nodes[d.index].group === 1) {
					return "url(#" + nodes[d.index].name.split(' ').join('') + ")";
				}
			})
			.call(this.drag(simulation));

		node.append("title")
	        .text(function(d) {
	            return d.name;
	        });

		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node
				.attr("cx", d => d.x)
				.attr("cy", d => d.y);
		})

		return svg.node()
	}

	render() {
		return (
			<div id='mysvg' className="svg">
			<script src="https://d3js.org/d3.v5.min.js"></script>
			</div>
		)
	}
	componentDidMount() {
		const elem = document.getElementById("mysvg");
		let ref = firebase.database().ref('movieGraph')
		let newNodes=[];
		let newLinks = [];
	  	ref.on('value', snapshot => {
	  		let actors = [];
	  		const data = snapshot.val()
	  		let i = 0
	  		let movieIndex = 0
	  		let actorIndex = 0
		  	for (let item in data) {
		  		newNodes.push({
			        name: data[item][0].name,
			        poster: data[item][0].poster,
			        group: 1,
			        count: i
			      });
		  		actors.push(data[item][0].name)
		  		movieIndex = i
		  		i = i + 1
		  		let actorsArr = data[item][0].actors.split(', ')
		  		for (let actor in actorsArr) {
		  			if (actors.includes(actorsArr[actor]) === false) {
			  			actors.push(actorsArr[actor])
			  			newNodes.push({
					        name: actorsArr[actor],
					        group: 2,
					        count: i
					    });
					    actorIndex = i
					    i = i + 1
		  			} else {
		  				actorIndex = actors.indexOf(actorsArr[actor])
		  			}
		  			newLinks.push({
		  				source: actorIndex,
		  				target: movieIndex,
		  				value: 1
		  			})
		  		}
		  	}
	  	this.setState({
			stateNodes: newNodes,
			stateLinks: newLinks
		});
		elem.appendChild(this.chart(newNodes, newLinks));
	  });
	
	}
}
export default Graph;
