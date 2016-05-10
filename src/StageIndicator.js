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

    const pipWidth = 100 / this.props.stages.length;

    let pipStyle = {
      width: pipWidth + "%",
      position: 'absolute',
      top: 0,
      left: (this.props.currentStage * pipWidth) - pipWidth + "%"
    }

    const baseClass = this.props.baseCSSClass;

    const labelNodes = this.props.stages.map((stage, index)=>{
      // If the label index is the same currentStage then add the active class
      let labelClassString = (index+1 === this.props.currentStage) ? baseClass + "__label " + baseClass + "__label--active" : baseClass + "__label";

      //If the stage can be skipped to then include the link
      if(stage.canSkipToThisStage && this.props.currentStage != index+1) {
        return (
          <div className={labelClassString} key={"label" + index}><a className={baseClass + "__link"} onClick={stage.clickHandler.bind(null, index+1)} href="#">{stage.label}</a></div>
        )
      }
      else {
        return (
          <div className={labelClassString} key={"label" + index}>{stage.label}</div>
        )
      }
    });

    return(
      <div className={baseClass}>
        <div className={baseClass + "__labels"}>
          {labelNodes}
        </div>
        <div className={baseClass + "__bar"} style={barStyle}>
          <div className={baseClass + "__pip"} style={pipStyle}>
          </div>
        </div>
      </div>
    );
  }

}

StageIndicator.propTypes = {
  stages: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    canSkipToThisStage: React.PropTypes.bool.isRequired,
    clickHandler: React.PropTypes.func.isRequired
  })).isRequired,
  currentStage: React.PropTypes.number.isRequired,
  baseCSSClass: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired
}


export default StageIndicator;
