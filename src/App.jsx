import React from 'react'
import { Outlet } from 'react-router-dom'

import Movies from './components/Movies/Movies'
import Navbar from './components/Navbar/Navbar'
import Search from './components/Search/Search'

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
