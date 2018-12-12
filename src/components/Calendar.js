import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '../calendar.css';
import Month from './Month.js'


class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      monthName: '',
      monthNum: '',
      days: '',
      start: ''
    }
    this.getToday = this.getToday.bind(this);
    this.getStartDate = this.getStartDate.bind(this);
    this.clickNextMonth = this.clickNextMonth.bind(this);
    this.clickPrevMonth = this.clickPrevMonth.bind(this);

  }
  componentDidMount(){
    //## get todays date to start calendar 
    let today = this.getToday();
    this.getStartDate(today);
  }
  getToday(){
    let today = new Date();
    today = moment(today);
    //console.log('today in getStartDate', today)
    return today;
  }
  getStartDate(date){
    //console.log('date in getStartDate', date)
    let month = date.month();
    //console.log('month in getStartDate', month);
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let monthName = months[month];
    //console.log('monthName in getStartDate', monthName)
    let monthObj = moment().month(monthName);
    //console.log('monthObj in getStartDate', monthObj)
    //get days in selected month
    let days = monthObj.daysInMonth();
    // console.log('days', days);
    let start  = monthObj.date(1);
    //console.log('startDay in getStartDate', startDay)
        start = start.day();
     //console.log('startDay in getStartDate', startDay)
     this.setState({
       monthName: monthName,
       monthNum: month,
       days: days,
       start: start
     })
  }
  clickNextMonth(){
    let m = this.state.monthNum;
    if(1 < m < 13) {
      m++;
    }
    if(m === 1){ m = 12 }
    //console.log('m in clickNextMonth', m)
    let monthObj = moment().month(m);
    //console.log('monthObj in clickNextMonth', monthObj)
    this.getStartDate(monthObj);
  }
  clickPrevMonth(){
    let m = this.state.monthNum;
    if(1 < m < 13) {
      m--;
    }
    if(m === 1){ m = 12 }
    //console.log('m in clickNextMonth', m)
    let monthObj = moment().month(m);
    //console.log('monthObj in clickNextMonth', monthObj)
    this.getStartDate(monthObj);
  }

  render(){
    return (
      <div>
        <Month monthName={this.state.monthName}
              monthDays={this.state.days}
              startDay={this.state.start}
              clickPrevMonth={this.clickPrevMonth}
              clickNextMonth={this.clickNextMonth}
              fightCards={this.props.fightCards}
              />
      </div>
    );
  }
}

export default Calendar;
