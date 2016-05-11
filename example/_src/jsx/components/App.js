import React from 'react';
import StageIndicator from '../../../../src/StageIndicator';
import Calendar from './Calendar';

var App = React.createClass({

  getInitialState: function() {
    return {
      currentStage: 3,
      stages: [
        {
          label: 'Stage one',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage two',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage three',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage four',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage five',
          canSkipToThisStage: false,
          clickHandler: this.handleClick
        }
      ]
    }
  },

  disableDate: function(date) {
    // debugger;
    if(date.getDayOfMonth() === 12) {
      return true;
    }
  },

  handleClick: function(stageNumber) {
    console.log('Fire Action to change stage to: ', stageNumber);

    this.setState({
      currentStage: stageNumber
    });
  },

  render: function() {
    return(
      <div>

        <StageIndicator
          currentStage={this.state.currentStage}
          baseCSSClass="StageIndicator"
          stages={this.state.stages} />

        <Calendar />

      </div>
    );
  }

});

export default App;
