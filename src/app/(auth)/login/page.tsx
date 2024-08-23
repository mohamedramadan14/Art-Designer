import { auth } from "@/auth";
import { LoginCard } from "@/features/auth/components/login-card";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  if (session) redirect("/");

  return <LoginCard />;
};

export default Login;
