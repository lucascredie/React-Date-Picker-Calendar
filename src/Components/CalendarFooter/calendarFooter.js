import React, {Component} from 'react';
import './calendarFooter.css';

class CalendarFooter extends Component {

    render() {
        // console.log(this.props.startDate.date)
        let startDate = "Starting Date"
        let endDate = "End Date"

        if(this.props.startDate.date !== null) {
            startDate = this.props.startDate.date.toString().slice(3,15);
        }

        if(this.props.endDate.date !== null) {
            endDate = this.props.endDate.date.toString().slice(3,15);
        }

        return(
            <div className="calendarContainer">
                <h3 className="footerDescription"> {startDate} - {endDate} </h3>
            </div>
        )
    }
}

export default CalendarFooter;