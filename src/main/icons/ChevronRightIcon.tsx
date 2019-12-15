import React from 'react'

const chevronRightSvg =
  <svg width="13" height="12" viewBox="0 0 12 12">
    <g>
      <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" strokeMiterlimit="10"
        points="4,1 10,6 4,11"/>
    </g>
  </svg>

function ChevronRightIcon() {
  return chevronRightSvg
}

ChevronRightIcon.displayName = 'ChevronRightIcons'

export default React.memo(ChevronRightIcon)
