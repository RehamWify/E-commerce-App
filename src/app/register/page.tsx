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
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "lucide-react";

const Register = () => {
  /*
  react hook form => control input
  zod => for validation
  shadcn ui => for design
  shadcn => do integration with react hook form and zod
  */

  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: RegisterSchemaType) {
    // console.log(values);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      console.log(data);

      toast.success(data.message, {
        position: "top-center",
        duration: 3000,
        icon: <CheckCircleIcon className="text-green-500" />
      });
      router.push("/login")


    } catch (error) {
      console.log(error);

      toast.error("Failed to Register Process", {
        position: "top-center",
        duration: 3000,
        icon: <CheckCircleIcon className="text-red-500" />

      });
    }
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full my-12 md:w-1/2">
      <h1 className="text-3xl text-center font-bold mb-5">Register Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name :</FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email :</FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Confirm Password :</FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Phone : </FormLabel>
                <FormControl>
                  {/* Your form field */}
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-5 bg-green-600 hover:bg-green-500">Register Now</Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
