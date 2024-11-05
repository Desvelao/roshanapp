import React, { Component } from 'react';
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle
} from 'reactstrap'
import Roshan from '../img/roshan.png'
import Patreon from '../img/patreon.png'
import { gear, robot, loudspeaker, money_mouth_face, supporter, pushpin } from '../constants/emojis.js'
import { DESVELAO_KOFI, DESVELAO_BE_PATRON } from '../constants/links'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import feature_img_dota2 from '../img/features/dota2.jpg'
import feature_img_artifact from '../img/features/artifact.jpg'
import feature_img_servers from '../img/features/servers.jpg'
import feature_img_utilityfun from '../img/features/utilityfun.jpg'

class Features extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Row>
                    <Col className='text-center'>
                        <div className='dv-text-title mb-2'>
                            <img src={Roshan} height="24" />
                            <span> Bot features</span>
                        </div>
                        <p><strong>Roshan</strong> is a bot with info about <strong>Dota 2</strong></p>
                        <p><strong>Register command:</strong> <code>/register</code></p>
                        <p><strong>Languages:</strong> english, spanish</p>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <div className='dv-text-title mb-2'>Base</div>
                        <Row>
                            {features.map(feature => <FeatureComp key={feature.name} feature={feature} />)}
                        </Row>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <div className='dv-text-title mb-2'>{supporter} Only for Supporters</div>
                        <p className='text-center'>Get supporter features through <a href={DESVELAO_KOFI}>Ko-fi</a> donations and get a piece of Roshan cheese {supporter} (figurated xd)</p>
                        <p className='text-center'>Leave your Discord ID in a message when you donate to add bot supporters. If you are at <a href={this.props.public_info.discord_server} target='_blank'>Roshan Development server</a>, you will get <strong>Supporter role!</strong></p>
                        <Row>
                            {supporterFeatures.map(feature => <SupporterComp key={feature.name} feature={feature} />)}
                        </Row>
                        <div className='text-center my-2'><em>and maybe more coming...</em></div>
                        <div className='text-center my-2 py-2'>
                            <Link className='mx-2' to={routes.PLAYERCARDBG}>See playercard backgrounds</Link>
                            <a className='mx-2' href={DESVELAO_KOFI} target='_blank'><img height='34' style={{ border: 0, height: 34 }} src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
                        </div>
                    </Col>
                </Row> */}
            </div>
        )
    }
}

const features = [
    {
        name : 'Dota 2',
        img: feature_img_dota2,
        features: [
            'Player stats, public games, last competitive games, world ranking by region',
            // 'Items, heroes, and skills info',
            // { text: 'r/Dota2', url: 'https://www.reddit.com/r/Dota2' },
            // {text : 'Player cards', url: '#/playercardbg'},
            {text : 'Registered players leaderboard', url: '#/leaderboard'},
            'Random hero picker',
        ]
    },
    {
        name: 'Utility and Fun',
        img: feature_img_utilityfun,
        features: [
            'Roll dice',
        ]
    }
]

const supporterFeatures = [{
    name: 'Customize player card background',
    description: 'You can change player card background'
}]

const FeatureComp = ({ feature }) => {
    return (
        <Col md='6' className='text-center mb-4'>
            <Card className='text-center h-100'>
                <CardImg top src={feature.img} alt={`${feature.name}'s image`} onError={(e) => { e.target.onError = null; e.target.src = feature.img }} style={{ height: '8em' }} />
                <CardBody style={{ padding: '0.75em' }}>
                    <CardTitle className='mb-2' style={{ marginBottom: '0' }}><strong>{feature.name}</strong></CardTitle>
                    {feature.features.map(f => (<li className='dv-botfeatures-li'>{!f.url ? f : (<a href={f.url}>{f.text}</a>)}</li>))}
                </CardBody>
            </Card>
        </Col>
    )
}

const SupporterComp = ({ feature }) => {
    return (<Col md='6' className='text-center mb-4'>
        <Card className='text-center h-100'>
            <CardBody style={{ padding: '0.75em' }}>
                <CardTitle className='mb-2' style={{ marginBottom: '0' }}><strong>{feature.name}</strong></CardTitle>
                <CardText>{feature.description}</CardText>
            </CardBody>
        </Card>
    </Col>)
}

const mapStateToProps = (state) => ({
  public_info : state.public_info
})

export default connect(mapStateToProps)(Features)
