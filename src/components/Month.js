import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import '../calendar.css';


class Month extends Component {

  constructor(props){
    super(props);

    this.state = {
      events: this.props.fightCards,
      month: []
    }

    this.getWeekTitleBar = this.getWeekTitleBar.bind(this);
    // this.getMonthName = this.getMonthName.bind(this);
    this.getMonthDays = this.getMonthDays.bind(this);
    this.getFirstWeekArr = this.getFirstWeekArr.bind(this);
    this.getDayCells = this.getDayCells.bind(this);
    this.getWeekRow = this.getWeekRow.bind(this);
    this.getWeekArr = this.getWeekArr.bind(this);
    this.getFightEvents = this.getFightEvents.bind(this);
    this.getMonthGrid = this.getMonthGrid.bind(this);
  }
  componentDidMount(){
    let monthName = this.props.monthName;
    let days = this.props.monthDays;

    // const events = this.getFightEvents(monthName, days);
    // const monArr = this.getMonthDays();
    // const monthGrid = this.getWeekRow(monArr, events);

    let monthEvents = this.props.fightCards;
    console.log('monthEvents in componentDidMount', monthEvents);
    let eventProps = this.state.events;
    console.log('eventProps in componentDidMount', eventProps);

    // this.setState({
    //   events: events
    // })

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
  // getMonthName(m){
  //   let monthName = m.monthName;
  //   return monthName;
  // }
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
  getDayCells(week, events){
    const dayCells = week.map(day => {
      console.log('events', events);
      console.log('day', day)
        let e = events[day];
        console.log('e', e);
          let start = e.start;
              start = moment().date(start);
          console.log('start', start)

          if(day === 0) {  return(
            <div className="day-space"></div>
          )  }
          else if( (day != 0) && (e != undefined) ){
            const n = Math.abs(e.id);
            console.log('n', n)
            const d = Math.abs(day);
            console.log('d', d)
            console.log(Boolean(n == d))
            if(n == d){
              console.log('ok')
              return(
                <div className="day-cell" key={day}>
                  <div className="event-box" >
                    <p>{e.start}</p>
                    <p>{e.title}</p>
                  </div>
                </div>
              )
            }
          }
          else {  return(
              <div className="day-cell" key={day}>
                { day }
              </div>
            )}
    })
    return dayCells;
  }
  getWeekRow(monArr, events){
    const weekRowItems = monArr.map(week =>
      <div className="week-row">
        {this.getDayCells(week, events)}
      </div>
    )
    return weekRowItems;
  }
  getFightEvents(m, d, e){
    // console.log('m in getFightEvents', m)
    // console.log('d in getFightEvents', d)
    let today = new Date;
        today = moment(today);
    let todayMonth = today.month();
    // console.log(todayMonth)
    let month = moment().month(m);
        month = month.month();
    // console.log('month in getFightEvents', month)
    let timeSpan = 30;
    if(month !== todayMonth){
      month = Math.abs((month - todayMonth));
      timeSpan = moment().duration(month, 'month');
      timeSpan = moment().duration().asDays(timeSpan);
      // console.log('timeSpan in getFightEvents', timeSpan)

    }
    else {
      timeSpan = moment().daysInMonth(month);
      // console.log('timeSpan in getFightEvents', timeSpan)
    }
    // console.log('timeSpan in getFightEvents', timeSpan)


    let monthEvents = e;
    console.log('monthEvents in getFightEvents', monthEvents);
    let eventProps = this.props.fightCards;
    console.log('eventProps in getFightEvents', eventProps);
    monthEvents = monthEvents.slice(0, timeSpan);
    //console.log('monthEvents2 in getEvents', monthEvents)
    // this.setState({
    //   events: monthEvents
    // })
    return monthEvents;
  }
  getMonthDays(){
    //console.log('start in getMonthDays', start);
    let monthName = this.props.monthName;
    //console.log('monthName in getMonthDays', monthName)
    let month = moment().month(monthName);
    //console.log('month in getMonthDays', month)
    //get days in selected month
    let days = this.props.monthDays;
    //console.log('days in getMonthDays', days);
    let startDay = this.props.startDay;
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
    console.log('monArr', monArr)
    return monArr;

  }

  getMonthGrid(events){
    const monArr = this.getMonthDays();
    const monthGrid = this.getWeekRow(monArr, events);
    return monthGrid;
  }


  render(){
    let events = this.props.fightCards;
    let monthName = this.props.monthName;
    let days = this.props.monthDays;
    let monArr, monthGrid;
    if(events.length > 0){
      events = this.getFightEvents(monthName, days, events);
      monArr = this.getMonthDays();
      monthGrid = this.getWeekRow(monArr, events);
    }

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

        </div>
      </div>
    );
  }
}

export default Month;
