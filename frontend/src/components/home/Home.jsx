import React from 'react'
import ProductList from '../ProductList'
import Navbar from './Navbar'
import Header from './Header'

function Home() {
  return (
     <div className="min-h-screen mx-10 mt-5">
      <Navbar />
      <Header/>
<ProductList/>
      </div>
  )
}

export default Home