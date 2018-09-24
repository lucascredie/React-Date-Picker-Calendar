/* Lucas Credie Nogueira de Lima && Malek Hakim - 2018 */

import React, { Component } from 'react';
import CalendarHeader from '../CalendarHeader/calendarHeader';
import DateList from '../DateList/dateList';
import CalendarFooter from '../CalendarFooter/calendarFooter';
import './calendar.css';

/*
    Calendar component holds Header, Date list and Footer together.
    here we maintain the state of the calendar too. 
*/

class Calendar extends Component {
    constructor(props) {
        super(props);

        //get client's current date and time
        let d = new Date();

        /*
            - State holds - 
            currentMonth ......... The current Month in view  
            currentYear: ......... Current year in view
            today: ............... clients current date and time    
            startDate: ........... begining of date range selected by user
            endDate:  ............ end of date range selected by user
            currentDate: ......... the day that the user just clicked on the calendar.
        */
       
        this.state = {
            currentMonth:  d.getMonth(),
            // currentMonth:  6,
            currentYear: d.getFullYear(),
            today: d,
            startDate: {date: null, index: -1},
            endDate: {date: null, index: -1},
            currentDate: null
        }
       
    }

    /*
        previousMonth decrements state's current month. this is used to alter the view.
        note that this method also handles if user is going from january to december of last year,
        in which case year is decremented and month is set to be December (11)
    */
    previousMonth = () => {
        if(this.state.currentMonth === 0) { 
            
            this.setState(prevState => {
                console.log("setting state");
                return {
                    currentMonth: 11,
                    currentYear: prevState.currentYear - 1
                }
            })  

        } else {
            this.setState(prevState => {
                return {currentMonth: prevState.currentMonth - 1}
            }, () => {
                // console.log(this.state.currentMonth)
            }) 
        }
    }

    /*
        followingMonth increments state's current month. this is used to alter the view.
        note that this method also handles if user is going from december to january of next year,
        in which case year is incremented and month is set to be january (0)
    */
    followingMonth = () => {
        if(this.state.currentMonth === 11) { //last month of the year
            console.log("next year");
            this.setState(prevState => {
                console.log("setting state");
                return {
                    currentMonth: 0,
                    currentYear: prevState.currentYear + 1
                }
            })  
        } else {

            this.setState(prevState => {
                return {currentMonth: prevState.currentMonth + 1}
            }, () => {
                // console.log(this.state.currentMonth)
            }) 
        }
        
          
    }

    //this sets current date user just picked and set it in state
    setCurrentDate = (userdate) =>{
        this.setState({currentDate: userdate});
    }

    //this sets start and end date user just picked based on current date. sets the state
    addDates = (date1, date2) => {
        
        this.setState({startDate: date1, endDate: date2});
    }

    render() {
            
            return (
                <div className="calendar-container">
                    <CalendarHeader
                     month={this.state.currentMonth } 
                     year={this.state.currentYear}
                     goBack={this.previousMonth}
                     goNext={this.followingMonth}/>

                    <DateList 
                    today={this.state.today}
                    month={this.state.currentMonth} 
                    year={this.state.currentYear}
                    addDates={this.addDates}
                    setCurrentDate={this.setCurrentDate}
                    currentDate={this.state.currentDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    />

                   <CalendarFooter
                   startDate={this.state.startDate}
                   endDate={this.state.endDate}
                   />

                </div>
            );

    }

    
    
    

}  



export default Calendar;
