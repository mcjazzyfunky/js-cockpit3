import React from 'react'

const downSvg =
  <svg width="20px" height="20px" viewBox="0 0 64 64">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10">
      <polyline strokeLinejoin="bevel" points="20,32 32,16 44,32 "/>
      <polyline strokeMiterlimit="10" points="32,16 32,56"/>
    </g>
  </svg>

function DownIcon() {
  return downSvg
}

DownIcon.displayName = 'DownIcon'

export default React.memo(DownIcon)