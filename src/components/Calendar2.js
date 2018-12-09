import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '../calendar.css';


class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {

    }

    this.setup = this.setup.bind(this);
    this.getWeekTitleBar = this.getWeekTitleBar.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getMonthDays = this.getMonthDays.bind(this);
    this.getFirstRow = this.getFirstRow.bind(this);
    this.getFirstWeekArr = this.getFirstWeekArr.bind(this);
    this.getDayCells = this.getDayCells.bind(this);
    this.getWeekRow = this.getWeekRow.bind(this);
    this.getWeekArr = this.getWeekArr.bind(this);
  }
  setup(){
    const months = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];


    let today = new Date();
    today = moment(today);
    let month = today.month();
    let day = today.day();

    console.log(month)
    console.log(day)

  }
  getWeekTitleBar(){
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const weekTitle = React.createElement(
      'div',
      {className: 'week-titlebar'}
    )
    days.forEach(day => {
      let weekCell = React.createElement(
        'div',
        {className: 'week-cell'},
        day
      );
    })

  }
  getMonthName(){
    const months = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    let today = new Date();
    today = moment(today);
    let month = today.month();
    let monthName = months[month];
    let letter = monthName.toString();
    let word = monthName.slice(1);
    letter = letter.charAt(0).toUpperCase();
    word = letter.concat(word);
    monthName = word.toString();
    return monthName;
  }
  getFirstRow(start, days){
    // let monthName = this.getMonthName();
    // let month = moment().month(monthName);
    // //get day of the week sun 0 - sat 6
    // let start = month.date(1);
    // console.log('start', start);
    // start = start.day();
    // console.log('start', start);
    // const cellArr = [];
    // for (let i = 0; i < start; i++) {
    //   const cell = ( <div className="day-cell"></div> )
    //   cellArr.push(cell)
    // }
    // return cellArr;
  }
  getDayCells(week){
    //console.log('week', week)

    // if (weekNum === 0) {
    //   let f = this.getFirstRowSpaces();
    //   console.log('f', f);
    //   week.push(f);
    // }
    //console.log('week', week)
    //console.log('week length', week.length)
    //
    // for (let i = 6; i > week.length; i--) {
    //   console.log('i', i)
    //   console.log('day', day)
    //   let d = <div className="day-cell" key={day} >{day}</div>;
    //   day++;
    //   week.push(d)
    // }
    //console.log('week', week)


    const dayCells = week.map(day =>
      <div className="day-cell">
        {day}
      </div>
    )
    return dayCells;

  }
  getFirstWeekArr(start){
    let weekArr = [];
    for (let i = 0; i < start; i++) { weekArr.push(0) }
    let s = 7 - start;
    for (let i = 1; i < (s+1); i++) { weekArr.push(i) }
    return weekArr;
  }
  getWeekArr(start, end){
    let weekArr = [];
    let s = start;
    for (let i = 0; i < 7; i++) {
      if ( s < end ) {
        weekArr.push(s);
        s++;
      }
    }
    console.log('weekarr get week arr', weekArr)
    return weekArr;

  }
  getWeekRow(daysArr){
    const weekRowItems = daysArr.map(week =>
      <div className="week-row">
        {this.getDayCells(week)}
      </div>
    )
    return weekRowItems;
  }

  getMonthDays(){
    let monthName = this.getMonthName();
    let month = moment().month(monthName);
    //console.log('month', month)
    //get days in selected month
    let days = month.daysInMonth();
    //console.log('days', days);
    let start = month.date(1);
        start = start.day();
    console.log('start', start)
    let weeks = Math.round((days / 7)) + 1;
    console.log('weeks', weeks)
    let monArr = [];


    //month = array of 5 weeks
    //week = array of 7 days
    const week1 = this.getFirstWeekArr(start, days);

    for (let d = 1; d < (days + 1); d++) {
      let weekArr = [];
      let s = 7 - start;
      if(d === s) {
        weekArr = this.getWeekArr(d, days);
        monArr.push(weekArr);
      }
      if( (d === (s + 7)) || (d === (s + 14)) || (d === (s + 21)) || (d === (s + 28)) ){
        weekArr = this.getWeekArr(d, days);
        if (weekArr.length > 0) { monArr.push(weekArr) }
      }
    }
    console.log('monArr', monArr)

    // for (let d = 1; d < (days + 1); d++) {
    //
    //   let start = month.date(1);
    //   start = start.day();
    //   console.log('start', start)
    //   console.log('weekarr start', weekArr)
    //   console.log('d', d)
    //   let s = d + start;
    //   console.log('s', s)
    //
    //   if (d === 1) {
    //     console.log('weekarr start', weekArr)
    //     for (let i = 0; i < start; i++) { weekArr.push(0) }
    //     console.log('weekarr finish', weekArr);
    //   }
    //   if ( weekArr.length != 7 ) {
    //     console.log('inside if length !=')
    //     console.log('day', d)
    //     weekArr.push(d)
    //     console.log('weekarr finish', weekArr)
    //   }
    //   if( weekArr.length === 7 ) {
    //     console.log('inside if length ==')
    //     if ( (s === 8) || (s === 15) || (s === 22) || (s === 29) ) {
    //       daysArr.push(weekArr);
    //     }
    //     let weekArr = [];
    //     console.log('weekarr end if', weekArr)
    //   }
    //   console.log('weekarr finish', weekArr);
    // };
    // console.log('daysArr outside for ', daysArr)
    //
    //
    // const weekRow = this.getWeekRow(daysArr);
    // console.log('weekRow',weekRow)
    //
    //
    // return weekRow;

  }


  render(){
    return (
      <div className="calendar-container">
        <div className="month-titlebar">{this.getMonthName()}</div>
        <div className="week-titlebar" id="week-titlebar">
          <div className="week-cell">Sun</div>
          <div className="week-cell">Mon</div>
          <div className="week-cell">Tue</div>
          <div className="week-cell">Wed</div>
          <div className="week-cell">Thur</div>
          <div className="week-cell">Fri</div>
          <div className="week-cell">Sat</div>
        </div>
        <div className="month-container">
          {this.getMonthDays()}


        </div>
      </div>
    );
  }
}

export default Calendar;

// TAKE 2


import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '../calendar.css';


class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
    this.clickNextMonth = this.clickNextMonth.bind(this);
    this.clickPrevMonth = this.clickPrevMonth.bind(this);
    this.getWeekTitleBar = this.getWeekTitleBar.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getMonthDays = this.getMonthDays.bind(this);
    this.getFirstWeekArr = this.getFirstWeekArr.bind(this);
    this.getDayCells = this.getDayCells.bind(this);
    this.getWeekRow = this.getWeekRow.bind(this);
    this.getWeekArr = this.getWeekArr.bind(this);
  }
  clickNextMonth(e){
    e.preventDefault();

  }
  clickPrevMonth(e){
    e.preventDefault();

  }
  getWeekTitleBar(){
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const weekTitle = React.createElement(
      'div',
      {className: 'week-titlebar'}
    )
    days.forEach(day => {
      let weekCell = React.createElement(
        'div',
        {className: 'week-cell'},
        day
      );
    })
  }
  getMonthName(){
    const months = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    let today = new Date();
    today = moment(today);
    let month = today.month();
    let monthName = months[month];
    let letter = monthName.toString();
    let word = monthName.slice(1);
    letter = letter.charAt(0).toUpperCase();
    word = letter.concat(word);
    monthName = word.toString();
    return monthName;
  }
  getFirstWeekArr(start){
    let weekArr = [];
    for (let i = 0; i < start; i++) { weekArr.push('') }
    let s = 7 - start;
    for (let i = 1; i < (s+1); i++) { weekArr.push(i) }
    return weekArr;
  }
  getWeekArr(start, end){
    let weekArr = [];
    let s = start;
    for (let i = 0; i < 7; i++) {
      if ( s < (end+1) ) {
        weekArr.push(s);
        s++;
      }
    }
    return weekArr;
  }
  getDayCells(week){
    const dayCells = week.map(day =>
      <div className="day-cell" >
        { day }
      </div>
    )
    return dayCells;
  }
  getWeekRow(monArr){
    const weekRowItems = monArr.map(week =>
      <div className="week-row">
        {this.getDayCells(week)}
      </div>
    )
    return weekRowItems;
  }

  getMonthDays(){
    let monthName = this.getMonthName();
    let month = moment().month(monthName);
    //console.log('month', month)
    //get days in selected month
    let days = month.daysInMonth();
    //console.log('days', days);
    let start = month.date(1);
        start = start.day();
    //console.log('start', start)
    let weeks = Math.round((days / 7)) + 1;
    //console.log('weeks', weeks)
    let monArr = [];


    //month = array of 5 weeks
    //week = array of 7 days
    const week1 = this.getFirstWeekArr(start, days);
    monArr.push(week1);


    for (let d = 1; d < (days + 1); d++) {
      let weekArr = [];
      let s = 7 - start;
      if(d === s) {
        weekArr = this.getWeekArr(d, days);
        monArr.push(weekArr);
      }
      if( (d === (s + 7)) || (d === (s + 14)) || (d === (s + 21)) || (d === (s + 28)) ){
        weekArr = this.getWeekArr(d, days);
        if (weekArr.length > 0) { monArr.push(weekArr) }
      }
    }
    //console.log('monArr', monArr)

    const monthGrid = this.getWeekRow(monArr);
    return monthGrid;

  }


  render(){
    return (
      <div className="calendar-container">
        <div className="calendar-nav">
          <button id="prev-mon">Previous</button>
          <button id="next-mon">Next</button>
        </div>
        <div className="month-titlebar">{this.getMonthName()}</div>
        <div className="week-titlebar" id="week-titlebar">
          <div className="week-cell">Sun</div>
          <div className="week-cell">Mon</div>
          <div className="week-cell">Tue</div>
          <div className="week-cell">Wed</div>
          <div className="week-cell">Thur</div>
          <div className="week-cell">Fri</div>
          <div className="week-cell">Sat</div>
        </div>
        <div className="month-container">
          {this.getMonthDays()}


        </div>
      </div>
    );
  }
}

export default Calendar;
