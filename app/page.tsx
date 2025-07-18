import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_USER } from "@/constants";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get(COOKIE_USER);
  console.log(user);
  if (!user) {
    redirect("/login");
  } else {
    redirect("/pet-dashboard");
  }
}
