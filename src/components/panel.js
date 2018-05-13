import { Panel, PanelGroup, Badge, Button } from 'react-bootstrap';
import React from 'react';

class PanelControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pausebtn: 'Pause',
      clearbtn: 'Clear & Stop' 
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handlePauseBtn = this.handlePauseBtn.bind(this);
    this.handleClearBtn = this.handleClearBtn.bind(this);
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
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
    return (
      <PanelGroup
        accordion
        id="accordion"
        onSelect={this.handleSelect}
      >
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"><i class="fab fa-wikipedia-w"></i></a>
              <h1>Game of Life</h1>
              <Button className="btn btn-danger" onClick={this.handleClearBtn} id={this.state.clearbtn}>{this.state.clearbtn}</Button>
              <Button
                className="btn btn-warning"
                onClick={this.handlePauseBtn} 
                style={this.state.clearbtn=='Fill & Start'?{display: 'none'}: {display:'initial'}}>
                {this.state.pausebtn}
              </Button>
              <div id="gen">Generation <Badge>{this.props.gen}</Badge></div>
            </Panel.Title>
          </Panel.Heading>
        </Panel>
      </PanelGroup>
      );
  }
}

export default PanelControl;