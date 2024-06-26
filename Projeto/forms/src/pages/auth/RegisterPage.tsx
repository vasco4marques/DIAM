
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data.username, data.password);
      alert("Conta criada com sucesso");
      navigate('/login');
    } catch (error) {
      alert("Erro ao criar conta");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md p-10 bg-white rounded-md shadow-md">
          <h1 className="mb-4 text-3xl font-semibold ">Registe-se</h1>
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
              Registar
            </button>
          </form>
          <p className="mt-4 text-center">
            Já possui uma conta?{" "}
            <Link to="/login" className="font-medium text-zinc-600">
              Entre aqui!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
