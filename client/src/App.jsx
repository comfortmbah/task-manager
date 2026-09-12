import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import ActiveTasks from './pages/ActiveTasks'
import CompletedTasks from './pages/CompletedTasks'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register';
import StartPage from './components/StartPage';
import PublicRoute from './components/PublicRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<StartPage />} />
      <Route path='/home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } 
      />
      <Route path='login' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } 
      />
      <Route path='active' element={
        <ProtectedRoute>
          <ActiveTasks />
        </ProtectedRoute>
      } 
      />
      <Route path='completed' element={
        <ProtectedRoute>
          <CompletedTasks />
        </ProtectedRoute>
      } 
      />
      <Route path='/register' element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } 
      />
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
