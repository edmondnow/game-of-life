import { Panel, PanelGroup, Badge, Glyphicon } from 'react-bootstrap';
import React from 'react';

class PanelControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: '0'
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
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
          </Panel.Body>
        </Panel>
      </PanelGroup>
      );
  }
}

export default PanelControl;