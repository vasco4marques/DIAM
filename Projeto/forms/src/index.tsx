import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoute from "./services/PrivateRoute";
import Home from "./pages/Home";
import App from "./App";
import RegisterPage from "./pages/auth/RegisterPage";
import NewForm from "./pages/forms/NewForm";
import EditForm from "./pages/forms/EditForm";
import AnswerForm from "./pages/forms/AnswerForm";
import SuccessPage from "./pages/SuccessAnswerSubmition";
import AnswersForm from "./pages/forms/ViewAnswers";
import ReviewPage from "./pages/Review";
import UsersPage from "./pages/Users";

// Aqui, nós definimos as rotas da aplicação.
// Cada rota é um objeto com as chaves path e element:
// O path é o caminho da rota;
// O element é o componente que será renderizado quando o caminho for aberto.
// O componente PrivateRoute é utilizado para verificar se o usuário está autenticado,
// Se estiver, renderiza o componente, se não, redireciona para a página de login.

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<App/>}/>,
    children:[
      {
        path: "/forms",
        element:  <PrivateRoute element={<Home/>}/>
        

      },
      {
        path: "/new",
        element: <PrivateRoute element={<NewForm/>}/>

      },
      {
        path: "/edit/:id",
        element: <PrivateRoute element={<EditForm/>}/>
      },
      {
        path: "/answers/:id",
        element: <PrivateRoute element={<AnswersForm/>}/>
      },
      {
        path: "/review",
        element: <PrivateRoute element={<ReviewPage/>}/>
      },
      {
        path: "/users",
        element: <PrivateRoute element={<UsersPage/>}/>
      },
    ]
  },
  {
    path: "/success",
    element: <SuccessPage/>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path:"/register",
    element: <RegisterPage/>
  },
  {
    path: "/answer/:id",
    element: <AnswerForm/>
  },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
