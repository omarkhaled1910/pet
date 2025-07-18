import React from "react";
import AuthHeader from "@/components/layout/AuthHeader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
