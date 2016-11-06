import React from 'react'

export let Row = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, ...style }}>
    {children}
  </div>

export let Column = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, flexDirection: `column`, ...style }}>
    {children}
  </div>
