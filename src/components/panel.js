import { Panel, PanelGroup, Badge, Glyphicon, Button } from 'react-bootstrap';
import React from 'react';

class PanelControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeKey: '0',
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
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>
              <h1>Game of Life <Glyphicon glyph="menu-down"/></h1>
              
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            Generation <Badge>{this.props.gen}</Badge>
            <Button className="btn btn-danger" onClick={this.handleClearBtn} id={this.state.clearbtn}>{this.state.clearbtn}</Button>
            <Button
              className="btn btn-warning"
              onClick={this.handlePauseBtn} 
              style={this.state.clearbtn=='Fill & Start'?{display: 'none'}: {display:'initial'}}>
              {this.state.pausebtn}
            </Button>
          </Panel.Body>
        </Panel>
      </PanelGroup>
      );
  }
}

export default PanelControl;