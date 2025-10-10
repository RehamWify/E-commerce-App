"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const Login = () => {
  /*
  react hook form => control input
  zod => for validation
  shadcn ui => for design
  shadcn => do integration with react hook form and zod
  */

  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {
    // console.log(values);
    // try {
    //   const { data } = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );

    //   console.log(data);

    //   toast.success(data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    //   router.push("/")

    // } catch (error) {
    //   console.log(error);

    //   toast.error(error.response.data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    // }

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    // console.log(res);

    if (res?.ok) {
      toast.success("login success", {
        position: "top-center",
        duration: 1000,
        icon: <CheckCircle className="text-green-500" />,
      });

      // redirect
      window.location.href = res.url || "/"
    } else {
      toast.error(res?.error, {
        position: "top-center",
        duration: 1000,
        icon: <CheckCircle className="text-red-500" />,
      });
    }
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full my-12 md:w-1/2">
      <h1 className="text-3xl text-center font-bold mb-5">Login Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email :</FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="email" {...field} placeholder="example@gmail.com" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Password :</FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="password" {...field} placeholder="Enter your password" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-end">
            <Link href={"/forgotpassword"} className="text-blue-600">Forgot Password ?</Link>
          </div>

          <Button className="w-full mt-5 bg-green-600 hover:bg-green-500">Login Now</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
