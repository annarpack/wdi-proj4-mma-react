import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import Calendar from './Calendar.js';

class FightCards extends Component {
	constructor(props){
		super(props);
		this.state = {
			fightCards: [],
			fightEvents: [],
			date: ''
		}
		this.searchFightCards = this.searchFightCards.bind(this);
	}
	componentDidMount(){
		this.searchFightCards();
	}
	searchFightCards(){
		//console.log('bullshit')
		//let todaysDate = new Date();
		//console.log(todaysDate)
		axios.get(`${this.props.url}/fight_cards/search?auth_token=${this.props.user.token}`).then(response => {
			console.log('response data', response.data)
			this.setState({
				fightCards: response.data.fights
			})
		})
	}
	render() {
		return(
      <div className="FightCards">
				<h1> Fight Card Events</h1>
				<Calendar fightCards={ this.state.fightCards }/>
      </div>
		);
	}
}

export default FightCards;
