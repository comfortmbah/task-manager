import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import ActiveTasks from './pages/ActiveTasks'
import CompletedTasks from './pages/CompletedTasks'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='active' element={<ActiveTasks />} />
      <Route path='completed' element={<CompletedTasks />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
};


export default App; 
