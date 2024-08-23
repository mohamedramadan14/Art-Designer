import { auth } from "@/auth";


export default async function Home() {
  const session  = await auth();
  return (
    <>
    <div>Hello, My Friend</div>
    <div>
      {JSON.stringify(session)}
    </div>
     </>
  );
}
