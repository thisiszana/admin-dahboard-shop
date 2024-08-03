import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function AuthForm({ type }) {
  return (
    <>
      {type === "LOGIN" && <LoginPage />}
      {type === "REGISTER" && <RegisterPage />}
    </>
  );
}
