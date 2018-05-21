import React, { Component } from "react";
import axios from 'axios';

class SingleFighter extends Component {
	constructor(props){
		super(props);
		this.state = {
			fighter: []
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.searchFighters = this.searchFighters.bind(this);
		this.getFighterImage = this.getFighterImage.bind(this);
	}
	componentDidMount(){
		// const fighter = this.props.location.query;
		// console.log(fighter);
		// this.setState({ fighter: fighter })
		//this.setState({ date: today_date })
		this.searchFighters();
	}
	searchFighters(){
		const params = this.props.match.params.name;
		const query = params.split('-')[1];
		axios.get(`${this.props.url}/fighters/results?auth_token=${this.props.user.token}&search=${query}`).then(response => {
			this.setState({
				fighter: response.data.results[0]
			})
		})
	}
	onSubmit(e){
		e.preventDefault();
		const fighter = { fighter: {
			full_name: this.state.fighter.full_name,
			first_name: this.state.fighter.first_name,
			last_name: this.state.fighter.last_name,
			weight_class: this.state.fighter.weight_class,
			title_holder: this.state.fighter.title_holder,
			status: this.state.fighter.status,
			image: this.state.fighter.image,
			belt_thumbnail: this.state.fighter.belt_thumbnail,
			wins: this.state.fighter.wins,
			losses: this.state.fighter.losses,
			draws: this.state.fighter.draws,
			user_id: this.props.user.id
		}}

		console.log(fighter);
		axios.post(`${this.props.url}/fighters_saves/create?auth_token=${this.props.user.token}`, fighter ).then(
			response => {
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}
	getFighterImage() {
		if(this.state.fighter.title_holder) {
			return this.state.fighter.belt_thumbnail;
		}
		else {
			return this.state.fighter.image;
		}
	}
	render() {
		return(
      <div className="fighter">
					<h3>{ this.state.fighter.full_name }</h3>
					<img src={ this.getFighterImage()	} alt={ this.state.fighter.full_name } />
					<ul>
						<li>Status: { this.state.fighter.status } </li>
						<li> Weight Class: {this.state.fighter.weight_class} </li>
						<li>{this.state.fighter.wins} WINS / {this.state.fighter.losses} LOSSES / {this.state.fighter.draws} DRAWS </li>
					</ul>
					<form onSubmit={this.onSubmit}>
						<input type='submit' value='Save Fighter' />
					</form>
      </div>
		);
	}
}

export default SingleFighter;
