import React, {Component} from 'react';
import './dateList.css';
import Day from '../Day/day'

/*
    This class generates all dates based on the current, previous and following month. 
    The idea is that we create an array with all months from previous, current and following in that order
    and use that to display a fraction that represents the current month 
    and some days of the previous and following months acording to the day of the week they appear in.

    The method get days in month is used to retrieve an array of dates of a specific month and year.
*/
class DateList extends Component {
   

    render() {
       
        //initialize variables that will hold previous and following month
        let previousMonthDates;
        let followingMonthDates;


        //this section grabs all months from previous, current and following and add them together
        /*
            note about this section: 
            january's previous month is the last month of the previous year. 
            The reverse of that is true for december, 
            where the following month is the first month of the following year
        */
        if(this.props.month === 0) { //if month is january
            previousMonthDates = getDaysInMonth(11, this.props.year - 1);
        } else {
            previousMonthDates = getDaysInMonth(this.props.month - 1, this.props.year);
        }
        
        if(this.props.month === 11) { //if month is december
            followingMonthDates = getDaysInMonth(0, this.props.year + 1);
        } else {
            followingMonthDates = getDaysInMonth(this.props.month + 1, this.props.year);
        }

        // current month dates
        let currentMonthDates = getDaysInMonth(this.props.month, this.props.year);
        //concat of all months creating 3 month array
        let allMonths= previousMonthDates.concat(currentMonthDates).concat(followingMonthDates);

        //this first slices it from the end of the month before minus the amount of days until current day starts
        //then limits the array to have 35 dates since that is the limit on our display
        let display = allMonths
        .slice(previousMonthDates[previousMonthDates.length - 1].getDate() - currentMonthDates[0].getDay()) 
        .slice(0,35);

        
        let displayData = display; //we make a copy of display

        /*
            here we use map to create an array with date strings of DMY. 
            ex: 1682018 for September 16 2018. 
            NOTE september is represented by 8 because months are represented starting at 0
        */
        displayData = displayData.map((date) => {
            return date.getDate() + "" + date.getMonth() + "" + date.getFullYear();
        })


        //this will set styles
        //gets day of the week where last month ends
        let lastMonthEndIndex = previousMonthDates[previousMonthDates.length - 1].getDay();

        //this accounts for when there is no previous month dates showing up in the display
        if(lastMonthEndIndex === 6) {
            lastMonthEndIndex = -1;
        }

        let currentMonthEndIndex = lastMonthEndIndex + currentMonthDates.length;
        
        //create an JSX array to be displayed with Day components
        display = display.map( (date, index) =>
            //conditions
            
            <Day 
            key={index} 
            index={index} 
            value={date.getDate()} 
            full={date} 
            currentMonth={this.props.month}
            currentYear={this.props.year}
            addDates={this.props.addDates}
            setCurrentDate={this.props.setCurrentDate}
            currentDate={this.props.currentDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            today={this.props.today}
            lastMonthEndIndex={lastMonthEndIndex}
            currentMonthEndIndex={currentMonthEndIndex}
            displayData={displayData}
            />
            
        );
         
        return(
            <div className="date-list">
                { display }
            </div>
        );
    }

    
}

//based on stack overflow method to get all days in month
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1); //start at first day of month
    var days = [];

    while (date.getMonth() === month) { //increment days until month flips over
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
       
    }
   
    return days;
}

export default DateList;