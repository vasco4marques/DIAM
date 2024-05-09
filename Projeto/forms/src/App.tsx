
import { Navigate, Outlet } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='h-full min-h-screen bg-slate-100'>
      <NavBar />
      <div className='pt-[5rem]'>
        <Outlet></Outlet>
        <Navigate to="/forms" replace={true} />
      </div>
    </div>
  )
}

export default App
