import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthProvider from './context/user/AuthProvider'
import TransactionProvider from './context/transaction/TransactionProvider'
import { PublicLayout, ProtectedLayout } from './Layouts'
import { DashboardPage, LoginPage, ProfilePage, AnalyticsPage, TransactionsPage, RegisterPage } from './pages'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TransactionProvider>
        <BrowserRouter>
          <Routes>

            <Route element={<PublicLayout/>}>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/register' element={<RegisterPage/>} />
            </Route>

            <Route element={<ProtectedLayout/>}>
              <Route path='/dashboard' element={<DashboardPage/>} />
              <Route path='/profile' element={<ProfilePage/>} />
              <Route path='/analytics' element={<AnalyticsPage/>} />
              <Route path='/transactions' element={<TransactionsPage/>} />
            </Route>

          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </AuthProvider>
  </StrictMode>,
)
