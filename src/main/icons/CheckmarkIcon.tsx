import React from 'react'

const checkmarkSvg = 
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g stroke="currentColor">
      <polyline fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10"
          points="13,33 25,48 49,21"/>
    </g>
  </svg>

function CheckmarkIcon() {
  return checkmarkSvg
}

CheckmarkIcon.displayName = 'CheckmarkIcon'

export default React.memo(CheckmarkIcon)
