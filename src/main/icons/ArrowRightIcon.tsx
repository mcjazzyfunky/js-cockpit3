import React from 'react'

const arrowRightSvg =
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="27,15 44,32 
        27,49"/>
    </g>
  </svg>

function ArrowRightIcon() {
  return arrowRightSvg
}

ArrowRightIcon.displayName = 'ArrowRightIcon'

export default React.memo(ArrowRightIcon)
