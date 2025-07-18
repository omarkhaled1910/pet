"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { login } from "@/app/actions/user";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/user";
import { COOKIE_USER } from "@/constants";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const form = useForm({
    defaultValues: {
      email: "admin@1.com",
      password: "pass",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const res = await login(value.email, value.password);
      if (res.success && res.user) {
        toast.success("Login successful");
        setUser(res.user);
        if (typeof window !== "undefined") {
          localStorage.setItem(COOKIE_USER, JSON.stringify(res.user));
        }
        router.push("/pet-dashboard");
        return;
      }
      toast.error(res.message);
    },
  });

  const emailField = {
    name: "email",
    label: "Email Address",
    type: "email" as const,
    placeholder: "Enter your email",
    validators: {
      onChange: ({ value }: { value: string }) =>
        !value
          ? "Email is required"
          : !value.includes("@")
          ? "Please enter a valid email address"
          : undefined,
    },
  };

  const passwordField = {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Enter your password",
    validators: {
      onChange: ({ value }: { value: string }) =>
        !value
          ? "Password is required"
          : value.length < 4
          ? "Password must be at least 4 characters"
          : undefined,
    },
  };
  return (
    <div>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <div>
                <div className="mt-2">
                  <FormField fieldConfig={emailField} form={form} />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <FormField fieldConfig={passwordField} form={form} />
                </div>
              </div>

              <div className="flex justify-center w-fill">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  )}
                />
              </div>
            </form>
            <br />
            <div className="flex items-center justify-between w-full">
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LoginPage;
