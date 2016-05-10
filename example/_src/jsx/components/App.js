import React from 'react';
import StageIndicator from '../../../../src/StageIndicator';


var App = React.createClass({

  getInitialState: function() {
    return {
      numberOfStages: 5,
      currentStage: 2,
      labels: [
        'Stage One',
        'Stage Two',
        'Stage Three',
        'Stage Four',
        'Stage Five',
      ]
    }
  },


  render: function() {
    return(
      <div>

        <StageIndicator
          numberOfStages={this.state.numberOfStages}
          currentStage={this.state.currentStage}
          baseCSSClass="StageIndicator"
          labels={this.state.labels} />

      </div>
    );
  }

});

export default App;
