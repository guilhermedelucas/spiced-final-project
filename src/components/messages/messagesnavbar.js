import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';


export default class MessagesNavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem: 'Received'
        };
    }

    handleItemClick(name){
        this.setState({ activeItem: name })
        this.props.callbackParent(name);
    }

    render() {
      const { activeItem } = this.state

      return (
        <div>
          <Menu pointing secondary>
            <Menu.Item name="Received" active={activeItem === 'Received'} onClick={() => this.handleItemClick("Received")} />
            <Menu.Item name="Sent" active={activeItem === 'Sent'} onClick={() => this.handleItemClick("Sent")} />
          </Menu>
        </div>
      )
    }
  }
