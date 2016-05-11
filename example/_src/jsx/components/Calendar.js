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
      displayingMoment: now,
      selectedDate: null
    }

  }

  handleDateCellClick(date) {
    this.setState({
      selectedDate: date
    });

    this.props.handleChange(date);
  }

  //Decrease Month
  handlePrevClick() {
    this.setState({
      displayingMoment: this.state.displayingMoment.subtract(1, 'month')
    });
  }

  //Increase Month
  handleNextClick() {
    this.setState({
      displayingMoment: this.state.displayingMoment.add(1, 'month')
    });
  }

  //Output the days of the week text
  renderDaysHeader() {
    return DAYS.map((day, index)=>{
      return <th className={this.props.clsName + '__headerCell'} key={"DayHeader"+index}>{day}</th>
    });
  }

  renderCalendarBody() {

    let daysInThisMonth = moment(this.state.displayingMoment.year() + '-' + (this.state.displayingMoment.month() + 1), 'YYYY-MM').daysInMonth(),
        whatDayIsFirstOfMonth = moment(this.state.displayingMoment.year() + '-' + (this.state.displayingMoment.month() + 1) + '-01', 'YYYY-MM-DD').day(),
        firstRowNodes = [],
        offset = -whatDayIsFirstOfMonth,
        counter = 0,
        rowCounter = 0,
        nodes = [];

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
          <tr key={"CalTabRow" + rowCounter} className={this.props.clsName + '__row'} >
            {firstRowNodes}
          </tr>
        );

        rowCounter++;

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

          nodes.push(<tr key={"CalTabRow" + rowCounter} className={this.props.clsName + '__row'}>{subRows}</tr>);
          rowCounter++
        }



        return nodes;

  }

  renderCalendarCell(number) {

    let key = (number === null) ? null : 'CalCell'+number;

    //if the cell is empty output a random key
    if(number === null) {
      return(
        <td key={"NullCell" + Math.floor(Math.random() * 999999999) + 1 }>{number}</td>
      );
    }
    else {

      let date = moment(this.state.displayingMoment.year() + '-' + (this.state.displayingMoment.month() + 1) + '-' + number, 'YYYY-MM-DD'),
          dateString = date.format('YYYY-MM-DD'),
          classString = date.isSame(this.state.selectedDate) ? this.props.clsName + '__date ' + this.props.clsName + '__date--active' : this.props.clsName + '__date';

      if(this.props.isDateActive()) {
        return(
          <td key={key} className={classString} onClick={this.handleDateCellClick.bind(this, dateString)}>{number}</td>
        );
      }
      else {
        return(
          <td key={key} className={this.props.clsName + '__date ' + this.props.clsName + '__date--inactive'}>{number}</td>
        );
      }


    }


  }

  renderCalendarHeader() {

    let headerDate = moment(this.state.displayingMoment.year() + '-' + (this.state.displayingMoment.month() + 1), 'YYYY-MM').format('MMMM YYYY');

    return (
      <div><a href="#" onClick={this.handlePrevClick.bind(this)}>Prev</a>{headerDate}<a href="#" onClick={this.handleNextClick.bind(this)}>Next</a></div>
    )
  }

  render() {

    let {clsName} = this.props;

    return (
      <div className={clsName}>
        <header className={clsName + '__header'}>
          {this.renderCalendarHeader()}
        </header>
        <table className={clsName + '__table'}>
          <thead>
            <tr className={this.props.clsName + '__headerRow'}>
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

Calendar.defaultProps = {
  clsName: "calendar",
  isDateActive: function() {
    return true;
  },
  handleChange: function(date) {
    console.log('Date changed: ', date);
  }
}

Calendar.PropTypes = {
  clsName: React.PropTypes.string,
  isDateActive: React.PropTypes.func,
  handleChange: React.PropTypes.func
}

export default Calendar;
