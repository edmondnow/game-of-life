import { Panel, PanelGroup, Badge, Button } from 'react-bootstrap';
import React from 'react';

class PanelControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pausebtn: 'Pause',
      clearbtn: 'Clear & Stop' 
    };

    this.handlePauseBtn = this.handlePauseBtn.bind(this);
    this.handleClearBtn = this.handleClearBtn.bind(this);
  }

  handlePauseBtn(){
    if(this.state.pausebtn=='Pause'){
      this.setState({pausebtn: 'Start'});
      this.props.handlePause()
    } else {
      this.setState({pausebtn: 'Pause'});
      this.props.handlePause()
    }
  }

  handleClearBtn(e){
    if(this.state.clearbtn=='Clear & Stop'){
      this.setState({clearbtn: 'Fill & Start', pausebtn: 'Start'});
      this.props.handleClear(e)
    } else {
      this.setState({clearbtn: 'Clear & Stop', pausebtn: 'Pause'});
      this.props.handleClear(e)
    }
  }
  render() {
    const { clearbtn, pausebtn} = this.state;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"><i className="fab fa-wikipedia-w"></i></a>
            <h1>Game of Life</h1>
            <Button className="btn btn-danger" onClick={this.handleClearBtn} id={clearbtn}>{clearbtn}</Button>
            <Button
              className="btn btn-warning"
              onClick={this.handlePauseBtn} 
              style={clearbtn=='Fill & Start'?{display: 'none'}: {display:'initial'}}>
              {pausebtn}
            </Button>
            <div id="gen"> <Badge>{this.props.gen} generations</Badge></div>
          </Panel.Title>
        </Panel.Heading>
      </Panel>
      );
  }
}

export default PanelControl;