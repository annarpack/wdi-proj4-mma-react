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
		this.getStartDate = this.getStartDate.bind(this);
		this.updateStartDate = this.updateStartDate.bind(this);
	}
	componentDidMount(){
		//this.setState({ date: today_date })

		this.searchFightCards();
	}
	searchFightCards(){
		//console.log('bullshit')
		//let todaysDate = new Date();
		//console.log(todaysDate)
		axios.get(`${this.props.url}/fight_cards/search?auth_token=${this.props.user.token}`).then(response => {
			//console.log(response.data)
			this.setState({
				fightCards: response.data.fights,
				date: response.data.date
			})
		})
	}
	getStartDate(){
		let startDate = new Date(this.state.date);
		let monthEvents = this.state.fightCards;
		monthEvents = monthEvents.slice(0, 30);
		monthEvents = monthEvents.map(elm => {
			console.log(elm)
			let date = new Date(elm.start);
			console.log(date);
			let obj = {
				id: elm.id,
				title: elm.title,
				start: new Date(elm.start)
			}
			return obj;
		})
		console.log(monthEvents)
		return monthEvents;

	}
	updateStartDate(){

	}

	render() {
		return(
      <div className="FightCards">
				<h1> Fight Card Events</h1>
				<Calendar />
      </div>
		);
	}
}

export default FightCards;
