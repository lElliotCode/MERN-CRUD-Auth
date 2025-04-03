import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1 className=' text-3xl text-red-900 flex justify-center items-center'>Home Page</h1>}/>
        <Route path='/register' element={<h1>Register</h1>}/>
        <Route path='/login' element={<h1>Login</h1>}/>
        <Route path='/profile' element={<h1>Profile</h1>}/>
        <Route path='/tasks' element={<h1>Tasks</h1>}/>
        <Route path='/add-task' element={<h1>Tasks por ID</h1>}/>
        <Route path='/tasks/:id' element={<h1>Modificar Task</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
