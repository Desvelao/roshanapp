import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import Roshan from '../img/roshan.png'

class Botinfo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className='dv-text-title mb-2'>
                    <img src={Roshan} height="24" />
                    <span> Bot features</span>
                    {/* <span> Roshan, <span>el Inmortal</span></span> */}
                </div>
                <p>It is a bot with info about <strong>Dota 2</strong> and <strong>Artifact</strong>.</p>
                <br />
                {features.map(feature => <FeatureComponent list={feature} />)}
            </div>
        )
    }
}

const FeatureComponent = ({list}) => (
    <div><strong className='dv-botfeatures-name'>{list.name}</strong>
        <ul>
            {list.features.map(feature => (<li className='dv-botfeatures-li'>{!feature.url ? feature : (<a href={feature.url}>{feature.text}</a>)}</li>))}
        </ul>
    </div>
)
const features = [
    {
        name : 'Dota 2',
        features: [
            'Player, public games, last competitive games, world ranking info',
            'Items, heroes, and skills',
            { text: 'r/Dota2', url: 'https://www.reddit.com/r/Dota2' },
            'Related twitters feeds'
        ]
    },
    {
        name: 'Artifact',
        features: [
            'Cards, sets, keywords, prices',
            'Deck decoder',
            { text: 'r/Artifact', url: 'https://www.reddit.com/r/Artifact'}
        ]
    },
    {
        name: 'Utility',
        features: [
            'Random number, initial tournament, server members giveaways...',
            'Related memes and images'
        ]
    }
]
export default Botinfo