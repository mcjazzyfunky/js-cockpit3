import React from 'react'

const upSvg =
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10">
      <polyline strokeLinejoin="bevel" points="20,40 32,56 44,40 "/>
      <polyline strokeMiterlimit="10" points="32,16 32,56"/>
    </g>
  </svg>

function UpIcon() {
  return upSvg
}

UpIcon.displayName = 'UpIcon'

export default React.memo(UpIcon)