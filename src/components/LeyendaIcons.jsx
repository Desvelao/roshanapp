import React, { Component } from 'react';
import * as emojis from '../constants/emojis.js'
import { classnames } from '../utils'

const LeyendaIcons = ({className,size}) => {
  return(
    <div className={className + ' ' + classnames({['dv-text-mini'] : size === 'mini'})}>
      <div className='font-weight-bold'>Icon leyend</div>
      <span>{emojis.pencil} Inscriptions until</span>
      <span> · </span>
      <span>{emojis.calendar} Tournament/Event starts</span>
      <span> · </span>
      <span>{emojis.red_flag} Tournament/Event ends</span>
    </div>
  )
}

export default LeyendaIcons
