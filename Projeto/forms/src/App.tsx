
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {

  // O componente App é o componente principal da aplicação
  // Aqui, nós definimos a estrutura da página, que é composta por um NavBar e um Outlet
  // O Outlet é onde o conteúdo das rotas é renderizado
  // O componente Navigate é utilizado para redirecionar o usuário para a rota /forms

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
