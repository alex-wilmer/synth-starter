import React from 'react'

export let Row = ({ children, style, className, ...props }) =>
  <div className={className} style={{ display: `flex`, ...style }} {...props}>
    {children}
  </div>

export let Column = ({ children, style, className, ...props }) =>
  <div className={className} style={{ display: `flex`, flexDirection: `column`, ...style }} {...props}>
    {children}
  </div>
