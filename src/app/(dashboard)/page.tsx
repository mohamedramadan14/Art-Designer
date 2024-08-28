import { protectByAuth } from "@/features/auth/utils";
import { Banner } from "./banner";


export default async function Home() {
  await protectByAuth();
  
  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
        <Banner />
    </div>
  );
}
