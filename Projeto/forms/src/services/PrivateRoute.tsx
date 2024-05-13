import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './AuthService';

interface Props {
  element: ReactNode;
}

// Esta função é responsável por verificar se o usuário está autenticado
// Se estiver, retorna o elemento certo, se não, redireciona para a página de login

function PrivateRoute({ element }: Props): any {
  const ableToAccess = isAuthenticated();
  return ableToAccess ? element : <Navigate to="/login" replace />;
}

export default PrivateRoute;
