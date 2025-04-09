import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { TaskPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { HomePage } from './pages/HomePage'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { ProtectedRoute } from './ProtectedRoute'
import { Header } from './components/Header'

function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/tasks' element={<TaskPage />} />
              <Route path='/add-task' element={<TaskFormPage />} />
              <Route path='/tasks/:id' element={<TaskFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
