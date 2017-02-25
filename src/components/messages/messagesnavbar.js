import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';


export default class MessagesNavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem: 'from'
        };
    }

    handleItemClick(name){
        this.setState({ activeItem: name })
        this.props.callbackParent(name);
    }

    render() {
      const { activeItem } = this.state

      return (
        <div style={{paddingBottom: "10px"}}>
          <Menu pointing secondary>
            <Menu.Item name="Received" active={activeItem === 'from'} onClick={() => this.handleItemClick("from")} />
            <Menu.Item name="Sent" active={activeItem === 'to'} onClick={() => this.handleItemClick("to")} />
          </Menu>
        </div>
      )
    }
  }
