import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Blogs from './components/Blogs'
import FullBlog from './components/FullBlog'
import PublishBlog from './components/PublishBlog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/blog/:blogId' element={<FullBlog />}/>
          <Route path='/writeBlog' element={<PublishBlog />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
