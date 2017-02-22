import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';


export default class FriendItemNavbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem: 'Books'
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
            <Menu.Item name="Books" active={activeItem === 'Books'} onClick={() => this.handleItemClick("Books")} />
            <Menu.Item name="Games" active={activeItem === 'Games'} onClick={() => this.handleItemClick("Games")} />
            <Menu.Item name="Music" active={activeItem === 'Music'} onClick={() => this.handleItemClick("Music")} />
            <Menu.Item name="Movies" active={activeItem === 'Movies'} onClick={() => this.handleItemClick("Movies")} />
          </Menu>
        </div>
      )
    }
  }

  // <Menu.Menu position='right'>
  // <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
  // </Menu.Menu>
