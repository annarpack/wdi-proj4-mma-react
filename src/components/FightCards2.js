import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
//import $ from 'jquery';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
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
		//## get the fight card events for the particular date
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
		//## get the event array start date
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
		//## change the start date of the event array or object 

	}

	render() {
		let events = [
			{
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  }

		];
		console.log(events)
		return(
      <div className="FightCards">
				<h1> Fight Card Events</h1>
				<BigCalendar
					events={ events }
					views={['month']}
					step={60}
					defaultDate={new Date()}
					startAccessor='startDate'
					endAccessor='endDate'
					/>
      </div>
		);
	}
}

export default FightCards;
