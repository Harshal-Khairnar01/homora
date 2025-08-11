"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const LoginForm = ({ origin = "signIn" }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (origin == "signIn") {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            toast.success("Logged in successfully ✅");
            reset();
            router.refresh();
          } else if (res?.error) {
            toast.error("Login failed ❌");
            console.error("Something went wrong:", res.error);
          }
        });
      } else {
        // about to make an api call
        axios.post("/api/auth/register", data).then((res) => {
          if (res.status === 201) {
            toast.success("Registered successfully ");
            reset();
            router.push("/sign-in");
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex h-[80vh] justify-center items-center">
      <div className=" space-y-2 w-full sm:w-1/2 mx-auto flex flex-col items-center">
        {origin == "signUp" && (
          <Input {...register("name")} type="text" placeholder="Your name" />
        )}
        <Input {...register("email")} type="email" placeholder="Your email" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Input your password"
        />
        <Button onClick={handleSubmit(onSubmit)} className=" w-full">
          {origin == "signUp" ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          onClick={() => signIn("google")}
          className=" w-full"
          type="button"
        >
          <Icons.google />
          {origin == "signUp" ? "Sign Up with Google" : "Sign In with Google"}
        </Button>
        {origin == "signUp" ? (
          <span className=" text-center">
            Already have an account?{" "}
            <Link className=" font-semibold" href="/sign-in">
              signIn
            </Link>{" "}
          </span>
        ) : (
          <span className=" text-center">
            Don't have an account?{" "}
            <Link className=" font-semibold" href="/sign-up">
              signUp
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
