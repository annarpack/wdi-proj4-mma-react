import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class FightCards extends Component {
	constructor(props){
		super(props);
		this.searchFightCards = this.searchFightCards.bind(this);
	}
	componentDidMount(){
		//this.setState({ date: today_date })
		//this.searchFightCards();
	}
	searchFightCards(){
		let todaysDate = new Date();
		console.log(todaysDate)
		axios.get(`${this.props.url}/fight_cards/search?auth_token=${this.props.user.token}`).then(response => {
			this.setState({
				
			})
		})
	}
	render() {
		return(
      <div className="FightCards">
				<h1> Fight Card Events</h1>
      </div>
		);
	}
}

export default FightCards;
