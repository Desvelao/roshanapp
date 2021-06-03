import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { date, getMedal } from '../utils';
import {  Row, Col, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import FooterSocial from '../components/FooterSocial.jsx'
import Sidebar from '../components/Sidebar.jsx'


const itemsByPage = 10;

const Ranking = ( props ) => {
  const leaderboard = props.leaderboard
  const [pagination, setPagination] = useState(1)
  const [itemsPage, setItemsPage] = useState([])

  useEffect(() => {
    setPagination(1);
    setItemsPage(props.leaderboard.ranking.slice(0,itemsByPage))
  }, [props.leaderboard]);

  useEffect(() => {
    setItemsPage(props.leaderboard.ranking.slice(itemsByPage*(pagination-1),itemsByPage*(pagination-1)+itemsByPage))
  },[pagination])

  const totalPages = Math.ceil((props.leaderboard.ranking.length || 0) / itemsByPage)
  
  return (
    <div>
      <Row>
        <Col md="9">
          <Row className='justify-content-center'>
            <Col md={8} lg={8} className='text-center'>
              <h3 className="mb-1 dv-text-title">Leaderboard</h3>
              <div className="mb-1 btn-primary d-inline-block p-2 rounded">Updated ⏰: {date(leaderboard.updated)}</div>
              <Table hover striped className='dv-table'>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Medal</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsPage && itemsPage.map( (player,index) => {
                    const medal = getMedal(player)
                    return (
                      <tr key={index+1}>
                        <td># {itemsByPage*(pagination-1)+index+1}</td>
                        <td>
                          <div className="d-flex align-items-center text-left">
                            <img className="mr-2 rounded-circle" src={player.avatar} alt="avatar"/>
                            <span>{player.nick}</span>
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
              {totalPages && (
                <Row className='justify-content-end'>
                  <TablePagination currentPage={pagination} totalPages={totalPages} onClickPage={setPagination}/>
                </Row>
              )}
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


const TablePagination = ({totalPages, currentPage, onClickPage}) => {
  const pages = pageNumbers(totalPages, currentPage)
  return (
    <Pagination aria-label="Table pagination" style={{paddingRight: 15}}>
      {pages.map(page => {
        if (page === LEFT_PAGE){
          return (
            <PaginationItem left active={currentPage === page} key={`table_pagination_${page}`}>
              <PaginationLink previous onClick={() => onClickPage(currentPage-1)}>
              </PaginationLink>
            </PaginationItem>
          )
        }

        if (page === RIGHT_PAGE){
          return (
            <PaginationItem right active={currentPage === page} key={`table_pagination_${page}`}>
              <PaginationLink next onClick={() => onClickPage(currentPage+1)}>
              </PaginationLink>
            </PaginationItem>
          )
        }
        return (
        <PaginationItem active={currentPage === page} key={`table_pagination_${page}`}>
          <PaginationLink onClick={() => onClickPage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
        )
      })}
    </Pagination>
  )
}

const pageNumbers = (totalPages, currentPage, pageNeighbours = 2) => {
  const totalNumbers = pageNeighbours*2 + 1
  const totalBlocks = totalNumbers + 2
  if(totalPages > totalBlocks){
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = range(startPage, endPage);
    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (totalPages + 1);

    // handle: (1) < {5 6} [7] {8 9} (10)
    if (hasLeftSpill && !hasRightSpill){
      const extraPages = range(startPage - spillOffset, startPage - 1);
      pages = [LEFT_PAGE, ...extraPages, ...pages];
    }

    // handle: (1) {2 3} [4] {5 6} > (10)
    if (!hasLeftSpill && hasRightSpill){
      const extraPages = range(endPage + 1, endPage + spillOffset);
      pages = [...pages, ...extraPages, RIGHT_PAGE];
    }

    // handle: (1) < {4 5} [6] {7 8} > (10)
    if (hasLeftSpill && hasRightSpill) {
      pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];

    }
    return [1, ...pages, totalPages]
  }
  return range(1, totalPages)
};

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const mapStateToProps = ( state ) => ({
  leaderboard : state.leaderboard
})

export default connect(mapStateToProps)(Ranking)
