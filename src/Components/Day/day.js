import React, {Component} from 'react';
import './day.css';

/*
    The DAY class handles style and date selection. it alters the calendar state when user selects
    a new date or when it selects a new range of dates.
    
    i am sure there are methods that could be passed along instead of being here but it works for now :)

*/
class Day extends Component {
 
    
    render() {
        
        //we slice the date so we have only "Sep 10 2018" to display in the footer
        let thisDayFullDate = this.props.today.toString().slice(0,15)
        let todayFullDate = this.props.full.toString().slice(0,15);

        //this are all boolean attributes that can will be swithed to activate css classes
        let isSelected = false; 
        let rightTip = false;
        let leftTip = false;
        let today = false;
        let notCurrentMonth = false;
        let currentDateSelected = false;

        //Marks the previous and following month dates that appear in the current month display
        //last month index cant be 6 otherwise it messes up the marking of previous months dates in view
        if(this.props.index <= this.props.lastMonthEndIndex) {
            notCurrentMonth = true;
        }
        if(this.props.index > this.props.currentMonthEndIndex) {
            notCurrentMonth = true;
        }

        //mark the current day
        if(thisDayFullDate  === todayFullDate) {
            today = true;
        }

        //mark when user selects a new date by comparing stringDates
        if(this.props.currentDate !== null && this.getStringDate(this.props.currentDate.date) === this.getStringDate(this.props.full)) {
            currentDateSelected = true;
        }

        // =====================================================================
        //                      HIGHLIGHT OF DATES SECTION
        // =====================================================================
        
        /*
            Here the first IF tests if there is a start and end date selected by the user and stored in state.
            Then we get the stringdate from those and from the current date (which is for each day in display)
            so we can compare them and highlight them accordingly.
        */

        if(this.props.startDate !== undefined && this.props.endDate !== undefined && this.props.startDate.date !== null && this.props.endDate.date !== null) {
            
            //look for te index of start and end date in the view and use that to paint it
            let startDateString = this.getStringDate(this.props.startDate.date);
            let endDateString = this.getStringDate(this.props.endDate.date);

            let currentDateString = this.getStringDate(this.props.full);

                //if we are between or = to either start or end date, we are in range and highlighed
                if(currentDateString >= startDateString && currentDateString <= endDateString) {
                    isSelected = true;
                }
                //if we are the start date, we are the left rounded css class
                if(currentDateString === startDateString) {
                    leftTip = true;
                }
                //if we are the end date, we are the right rounded css class
                if(currentDateString === endDateString) {
                    rightTip = true;
                }
        }

        // =====================================================================
        // 
        // =====================================================================

        //STYLE this section sets classname styles based on the booleans further in the top.
        let styleName = "";
        
        if(today) { 
            styleName = "today" 
        }

        if(isSelected) { 
            styleName = "selected" 
        }

        if(leftTip) {
            styleName += " leftTip"
        } 
        
        if(rightTip) {
            styleName += " rightTip"
        } 
        if(notCurrentMonth && !isSelected) {
            styleName += " notCurrent"
        }

        if(currentDateSelected) {
            styleName += " currentDate"
        }

        

        return(
            <p className={styleName} onClick={this.returnFull} > {this.props.value} </p>
        )
    }

   
    //this method takes in a date obj and return its unique string: 20180816 for sep 16 2018
    //we use this string as a way to compare which date is bigger or smaller so they can be properly 
    //displayed in the interface. to do so we add 0s to numbers smaller than 10 so the numbers compared
    //are alwyas 8 digits long and always truthfull when compared.
    getStringDate(date) {
        let day = date.getDate();
        let month = date.getMonth();
        if(day < 10) {
            day = "0" + day;
        }
        if(month < 10) {
            month = "0" + month;
        }
        return date.getFullYear() + "" + month + "" + day;
    }


    returnFull = () => {
      /*
      compare if is close to current date 
      if distance between current date 
      and startdate index is smaller than end date distance then replace start date
      */

        //if yes use the index to identify which one is the start or end date
       if(this.props.currentDate === null) {
           this.clearDates();
       }
        console.log("setting current date");
        this.props.setCurrentDate({date: this.props.full, index: this.props.index});
      

        if(this.props.currentDate !== null && this.getStringDate(this.props.currentDate.date) < this.getStringDate(this.props.full)) {
            
            //date that was just selected (this.props.full) is last date
            console.log("i just selected the last date");
            this.props.addDates(this.props.currentDate,{date: this.props.full, index: this.props.index});
            this.props.setCurrentDate(null);
                 
        } else if (this.props.currentDate !== null && this.getStringDate(this.props.currentDate.date) > this.getStringDate(this.props.full)){
            console.log("i just selected the start date");
            this.props.addDates({date: this.props.full, index: this.props.index}, this.props.currentDate);
            this.props.setCurrentDate(null);
        } 
    }

    //clear all start and end date and resets them to normal state
    clearDates = () => {
        this.props.addDates({date:null, index: -1}, {date: null, index: -1});
    }

}

export default Day;