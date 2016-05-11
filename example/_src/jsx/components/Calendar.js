import React from 'react';
import moment from 'moment';

const DAYS = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    let now = moment();
    this.state = {
      monthToDisplay: 0, //now.month()
      yearToDisplay: now.year()
    }

  }

  renderDaysHeader() {

    return DAYS.map((day, index)=>{
      return <th key={"DayHeader"+index}>{day}</th>
    });

  }

  renderCalendarBody() {

    let daysInThisMonth = moment(this.state.yearToDisplay + '-' + (this.state.monthToDisplay + 1), 'YYYY-MM').daysInMonth(),
        whatDayIsFirstOfMonth = moment(this.state.yearToDisplay + '-' + (this.state.monthToDisplay + 1) + '-01', 'YYYY-MM-DD').day();

        console.log('Days in this month: ', daysInThisMonth);
        console.log('Days of the first: ', whatDayIsFirstOfMonth);

        var firstRowNodes = [];
        var offset = -whatDayIsFirstOfMonth;
        var counter = 0;
        var nodes = [];

        //Generate the first row offset based on where the month begins
        for (var i = 1; i < 8; i++) {
          if((i + offset) < 1) {
            firstRowNodes.push(this.renderCalendarCell(null));
          }
          else {
            firstRowNodes.push(this.renderCalendarCell(i + offset));
          }

          counter = i + offset;
        }

        counter++;

        nodes.push(
          <tr>
            {firstRowNodes}
          </tr>
        );

        while(counter <= daysInThisMonth) {
          let subRows = [];
          var target = counter + 7;


          for(var j = counter; j < target; j++ ) {
            if(j <= daysInThisMonth){
              subRows.push(this.renderCalendarCell(counter));
            }
            else{
              subRows.push(this.renderCalendarCell(null));
            }
            counter++;
          }

          nodes.push(<tr>{subRows}</tr>)
        }



        return nodes;

  }

  renderCalendarCell(number) {
    return(
      <td>{number}</td>
    );
  }

  renderCalendarHeader() {

    let headerDate = moment(this.state.yearToDisplay + '-' + (this.state.monthToDisplay + 1), 'YYYY-MM').format('MMMM YYYY');

    return (
      <div>{headerDate}</div>
    )
  }

  render() {
    return (
      <div>
        <header>
          {this.renderCalendarHeader()}
        </header>
        <table>
          <thead>
            <tr>
              {this.renderDaysHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderCalendarBody()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calendar;
