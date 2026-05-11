import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './Layouts/Layout'
import { DashboardPage, LoginPage, ProfilePage, AnalyticsPage, TransactionsPage, RegisterPage } from './pages'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route element={<Layout/>}>
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/analytics' element={<AnalyticsPage/>} />
          <Route path='/transactions' element={<TransactionsPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
