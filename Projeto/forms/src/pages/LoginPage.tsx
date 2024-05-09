
import { useForm } from "react-hook-form";
import { login, logout } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage: React.FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    logout()
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await login(data.username, data.password);
      navigate('/forms');
    } catch (error) {
      alert("Erro ao fazer login");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md p-10 bg-white rounded-md shadow-md">
          <h1 className="mb-4 text-3xl font-semibold ">Entre com sua conta</h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className={"block  font-medium mb-2" + (errors?.username?.type === 'required' ? ' text-red-700' : ' text-zinc-700')}

              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className={"border  rounded-md p-2 w-full" + (errors?.username?.type === 'required' ? ' border-red-800' : ' border-zinc-300')}
                {...register('username', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"

                className={"block  font-medium mb-2" + (errors?.username?.type === 'required' ? ' text-red-700' : ' text-zinc-700')}

              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                className={"border  rounded-md p-2 w-full" + (errors?.username?.type === 'required' ? ' border-red-800' : ' border-zinc-300')}
                {...register('password', { required: true })}
              />
            </div>
            <button
              type="button"
              className="w-full p-2 mb-6 font-bold text-white rounded-full bg-zinc-600 hover:bg-zinc-800"
              onClick={() => handleSubmit(onSubmit)()}
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center">
            Ainda não possui uma conta?{" "}
            <Link to="/register" className="font-medium text-zinc-600">
              Registe-se já!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
