import { cookies } from "next/headers";
import { COOKIE_TOKEN } from "@/constants";

export const validateCokkieToken = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get(COOKIE_TOKEN);
  if (!user?.value) {
    throw new Error("UNAUTHORIZED");
  }
  return user.value;
};
