import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from '../constants/routes'
import { date,getMedal } from '../utils'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button, Table } from 'reactstrap'
import FooterSocial from '../components/FooterSocial.jsx'
import Sidebar from '../components/Sidebar.jsx'

const ranking = ( props) => {
  const leaderboard = props.leaderboard
  return (
    <div>
      <Row>
        <Col md="9">
          <Row className='justify-content-center'>
            <Col md={12} lg={12} className='text-center'>
              <h3 className="mb-1 dv-text-title">Leaderboard</h3>
              <div className="mb-1 btn-primary d-inline-block p-2 rounded">Actualizada ⏰: {date(leaderboard.updated)}</div>
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Jugador/a</th>
                    <th>Medalla</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.ranking && leaderboard.ranking.map( (player,index) => {
                    const medal = getMedal(player)
                    return (
                      <tr key={index+1}>
                        <td># {index+1}</td>
                        <td>
                          <div className="d-flex align-items-center text-left">
                            <img className="mr-2" src={player.avatar} alt="avatar"/>
                            <span>{player.username} ({player.nick})</span>
                          </div>
                        </td>
                        <td title={medal.tooltip}>
                          <div className="text-center d-flex align-items-center justify-content-center" data-toggle="tooltip" data-placement="top">
                            <img src={medal.img} className="mr-1" alt="medal"/>
                            <span className=""> {medal.leaderboard}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Col md="3">
          <Sidebar/>
        </Col>
      </Row>
      <FooterSocial/>
    </div>
  )
}

const mapStateToProps = ( state ) => ({
  leaderboard : state.leaderboard
})

export default connect(mapStateToProps)(ranking)
