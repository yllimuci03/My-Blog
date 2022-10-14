import React from 'react'
import Header from './Header'

const Layout = ({ categories, children }) => {
  return (
    <>
      <Header categories={categories} />
      {children}
    </>
  )
}

export default Layout
