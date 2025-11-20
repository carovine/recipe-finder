import { SignIn } from "@clerk/react-router";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Login;
