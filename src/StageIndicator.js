import React from 'react';

class StageIndicator extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(index) {
    event.preventDefault();
    this.props.handleClick(index);
  }

  render() {

    const barStyle = {
      position: 'relative',
      overflow: 'hidden'
    }

    const pipWidth = 100 / this.props.numberOfStages;

    let pipStyle = {
      width: pipWidth + "%",
      position: 'absolute',
      top: 0,
      left: (this.props.currentStage * pipWidth) - pipWidth + "%"
    }

    const labelNodes = this.props.labels.map((label, index)=>{
      // If the label index is the same currentStage then add the active class
      let labelClassString = (index+1 === this.props.currentStage) ? this.props.baseCSSClass + "__label " + this.props.baseCSSClass + "__label--active" : this.props.baseCSSClass + "__label";

      if(index+1 < this.props.currentStage) {
        return (
          <div className={labelClassString} key={"label" + index}><a onClick={this.handleClick.bind(this, index+1)} href="#">{label}</a></div>
        )
      }
      else {
        return (
          <div className={labelClassString} key={"label" + index}>{label}</div>
        )
      }


    });

    return(
      <div className={this.props.baseCSSClass}>
        <div className={this.props.baseCSSClass + "__labels"}>
          {labelNodes}
        </div>
        <div className={this.props.baseCSSClass + "__bar"} style={barStyle}>
          <div className={this.props.baseCSSClass + "__pip"} style={pipStyle}>
          </div>
        </div>
      </div>
    );
  }

}

StageIndicator.propTypes = {
  numberOfStages: React.PropTypes.number.isRequired,
  currentStage: React.PropTypes.number.isRequired,
  baseCSSClass: React.PropTypes.string.isRequired,
  labels: React.PropTypes.array.isRequired,
  handleClick: React.PropTypes.func.isRequired
}


export default StageIndicator;
