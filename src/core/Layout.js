import React from 'react';

// Reusable layout to receive props from other pages
const Layout = ({title='Title', description='description', className, children}) => (

  <div>
    <div className='jumbrotron'>
      <h2>{title}</h2>
      <p className='lead'>{description}</p>
    </div>

    <div className={className}> {children} </div>
  </div>
)

export default Layout;