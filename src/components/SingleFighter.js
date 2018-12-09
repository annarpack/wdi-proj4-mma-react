import React, { Component } from "react";
import axios from 'axios';
import Fighter from './Fighter.js';

class SingleFighter extends Component {
	constructor(props){
		super(props);
		this.state = {
			fighter: []
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.searchFighters = this.searchFighters.bind(this);
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
		console.log(this.props.homepage)
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
		axios.post(`${this.props.url}/fighters_saves?auth_token=${this.props.user.token}`, fighter ).then(response => {
			const res = response.data.response;
			if(res === 'saved') { window.location.replace(`${this.props.homepage}/fighters_saved`); }
		}).catch(error => {
			console.log(error);
		})
	}
	render() {
		return(
			<div>
			<h1> Fighter Info </h1>
      <div className="fighter">
					<Fighter fighter={ this.state.fighter } />
					<form onSubmit={this.onSubmit}>
						<input type='submit' value='Save Fighter' />
					</form>
      </div>
			</div>
		);
	}
}

export default SingleFighter;
