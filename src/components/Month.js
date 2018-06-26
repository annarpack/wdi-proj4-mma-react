import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '../calendar.css';


class Month extends Component {

  constructor(props){
    super(props);

    this.getWeekTitleBar = this.getWeekTitleBar.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getMonthDays = this.getMonthDays.bind(this);
    this.getFirstWeekArr = this.getFirstWeekArr.bind(this);
    this.getDayCells = this.getDayCells.bind(this);
    this.getWeekRow = this.getWeekRow.bind(this);
    this.getWeekArr = this.getWeekArr.bind(this);
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
  getMonthName(m){
    let monthName = m.monthName;
    return monthName;
  }
  getFirstWeekArr(startDay){
    let weekArr = [];
    for (let i = 0; i < startDay; i++) { weekArr.push(0) }
    let s = 7 - startDay;
    for (let i = 1; i < (s+1); i++) { weekArr.push(i) }
    return weekArr;
  }
  getWeekArr(startDay, end){
    let weekArr = [];
    let s = startDay;
    for (let i = 0; i < 7; i++) {
      if ( s < (end+1) ) {
        weekArr.push(s);
        s++;
      }
    }
    return weekArr;
  }
  getDayCells(week){
    const dayCells = week.map(day => {
        if(day === 0) {  return(
            <div className="day-space"></div>
          )  }
        else {  return(
            <div className="day-cell" key={day}>
              { day }
            </div>
          )}
    })
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

  getMonthDays(start){
    //console.log('start in getMonthDays', start);
    let monthName = start.monthName;
    //console.log('monthName in getMonthDays', monthName)
    let month = moment().month(monthName);
    //console.log('month in getMonthDays', month)
    //get days in selected month
    let days = start.monthDays;
    //console.log('days in getMonthDays', days);
    let startDay = start.startDay;
    //console.log('startDay in getMonthDays', startDay)
    let weeks = Math.round((days / 7)) + 1;
    //console.log('weeks in getMonthDays', weeks)
    let monArr = [];
    //month = array of 5 weeks
    //week = array of 7 days


    const week1 = this.getFirstWeekArr(startDay, days);
    monArr.push(week1);
    for (let d = 1; d < (days + 1); d++) {
      let weekArr = [];
      let s = 7 - startDay;
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
          <button id="prev-mon" onClick={ this.props.clickPrevMonth }>Previous</button>
          <button id="next-mon" onClick={ this.props.clickNextMonth }>Next</button>
        </div>
        <div className="month-titlebar">{this.props.monthName}</div>
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
          {this.getMonthDays( this.props )}
        </div>
      </div>
    );
  }
}

export default Month;
