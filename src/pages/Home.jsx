import React from 'react'
import Header from '../components/Header'
import CompanyInfo from '../components/CompanyInfo'
import { data } from '../content/data'
import CategorySelector from '../components/CatagorySelection'
import { Outlet, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-screen bg-gray-50'>
        <Header />
        <CompanyInfo />
        <Outlet />
       <CategorySelector categories={data}/>
          
       
        
    </div>
  )
}

export default Home
