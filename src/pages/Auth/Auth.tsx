import { LoginForm } from "@/components/Login/LoginForm";
import { Register } from "@/components/Register/Register";
import React, { useState } from "react";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <article>
      {isLogin ? <LoginForm /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>Switch State Test</button>
    </article>
  );
};

export default Auth;
