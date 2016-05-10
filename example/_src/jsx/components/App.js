import React from 'react';
import StageIndicator from '../../../../src/StageIndicator';


var App = React.createClass({

  getInitialState: function() {
    return {
      numberOfStages: 5,
      currentStage: 3,
      labels: [
        'Stage One',
        'Stage Two',
        'Stage Three',
        'Stage Four',
        'Stage Five',
      ],
      stages: [
        {
          label: 'Stage One',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage Two',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage Three',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage Four',
          canSkipToThisStage: true,
          clickHandler: this.handleClick
        },
        {
          label: 'Stage Five',
          canSkipToThisStage: false,
          clickHandler: this.handleClick
        }
      ]
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
          handleClick={this.handleClick}
          stages={this.state.stages} />

      </div>
    );
  }

});

export default App;
