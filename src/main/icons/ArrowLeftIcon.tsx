import React from 'react'

const arrowLeftSvg =
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="37,15 20,32 
        37,49"/>
    </g>
  </svg>

function ArrowLeftIcon() {
  return arrowLeftSvg
}

ArrowLeftIcon.displayName = 'ArrowLeftIcon'

export default React.memo(ArrowLeftIcon)
