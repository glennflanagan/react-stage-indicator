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
          numberOfStages={this.state.numberOfStages}
          currentStage={this.state.currentStage}
          baseCSSClass="StageIndicator"
          labels={this.state.labels}
          handleClick={this.handleClick} />

      </div>
    );
  }

});

export default App;
