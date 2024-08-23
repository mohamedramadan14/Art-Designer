import { auth } from "@/auth";
import { RegisterCard } from "@/features/auth/components/register-card";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await auth();
  if (session) redirect("/");

  return <RegisterCard />;
};

export default Register;
