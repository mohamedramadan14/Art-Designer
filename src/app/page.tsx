import { auth } from "@/auth";
import { protectByAuth } from "@/features/auth/utils";


export default async function Home() {
  await protectByAuth();
  const session = await auth();
  
  return (
    <>
    <div>Hello, My Friend</div>
    <div>
       You are logged in {JSON.stringify(session)}
    </div>
     </>
  );
}
