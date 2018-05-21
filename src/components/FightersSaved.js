import React, { Component } from "react";
import axios from 'axios';

class FightersSaved extends Component {
	constructor(props){
		super(props);
		this.state = {
			fighters: []
		}
		this.getFighters = this.getFighters.bind(this);
		this.getFighterImage = this.getFighterImage.bind(this);
	}

	componentDidMount(){
		this.getFighters();
	}
	getFighters(){
		let fightersArr = [];
		axios.get(`${this.props.url}/fighters_saves?auth_token=${this.props.user.token}`).then(response => {
			//response.data.fighters.forEach(f => { fightersArr.push(f) });
			this.setState({
				fighters: response.data.fighters
			})
		})
	}
	getFighterImage(f) {
		if(f.title_holder) {
			return f.belt_thumbnail;
		}
		else {
			return f.image;
		}
	}

	render() {
		// let fighters = this.state.fighters;
		// let fArr = {};
		// let fightersValues = fighters.pop();
		// console.log('fighters', fighters)
		// console.log('fighters1', fighters.length)
		// console.log('fightersValues', fightersValues)
		return(
			<div>
			{console.log(this.state.fighters[0])}
			{this.state.fighters.map((f, i) =>
				<div>
				<h2>{f}</h2>
				</div>
			)}
			</div>
    )
	}
}

export default FightersSaved;
