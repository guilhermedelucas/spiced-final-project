import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const CardExampleImageCard = () => (
  <div style={{display: "inline-flex"}}>
  <Card style={{width: "200px", margin: "10px"}}>
    <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
    <Card>
    <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
    <Card>
    <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
    <Card>
    <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
  </div>
)

export default CardExampleImageCard
