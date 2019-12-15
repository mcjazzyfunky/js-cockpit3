import React from 'react'

const arrowDoubleLeftSvg =
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="32.936,48.936 
        15.936,31.936 32.936,14.936"/>
    </g>
    <g>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="47.936,48.936 
        30.936,31.936 47.936,14.936"/>
    </g>
  </svg>

function ArrowDoubleLeftIcon() {
  return arrowDoubleLeftSvg
}

ArrowDoubleLeftIcon.displayName = 'ArrowDoubleLeftIcon'

export default React.memo(ArrowDoubleLeftIcon)