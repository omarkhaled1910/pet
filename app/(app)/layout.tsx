import React from "react";
import Header from "@/components/layout/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_USER } from "@/constants";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const user = cookieStore.get(COOKIE_USER);
  console.log(user);
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <Header />
      <div className="min-h-screen  container mx-auto py-4">{children}</div>
    </div>
  );
};

export default AppLayout;
