import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./calendarHeader.css";

/*
    CalendarHeader component handles moving from month to month and displays the weekdays
*/
class CalendarHeader extends Component {

    render() {
        //array that connects index from date object ( getDay()) and a month of the year.
        let monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        return (
        <div>
            <div className="calendarHeader">
            
                <FontAwesomeIcon onClick={this.props.goBack} className="icon" icon="arrow-alt-circle-left"/>
                <h4> { monthName[this.props.month] } { this.props.year } </h4>
                <FontAwesomeIcon onClick={this.props.goNext} className="icon" icon="arrow-alt-circle-right"/>
                
            </div>
            <div className="weekDays">

                <h6> sun </h6>
                <h6> mon </h6>
                <h6> tue </h6>
                <h6> wed </h6>
                <h6> thu </h6>
                <h6> fri </h6>
                <h6> sat </h6>
                
            </div>
        </div>
        );
    }

    

}



export default CalendarHeader;