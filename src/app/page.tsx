import { auth } from "@/auth";
import { protectByAuth } from "@/features/auth/utils";


export default async function Home() {
  await protectByAuth();
  return (
    <>
    <div>Hello, My Friend</div>
    <div>
       You are logged in {JSON.stringify(await auth())}
    </div>
     </>
  );
}
