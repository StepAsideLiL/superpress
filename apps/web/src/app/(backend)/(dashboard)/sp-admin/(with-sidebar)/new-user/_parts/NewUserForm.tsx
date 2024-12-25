"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import icon from "@/lib/icons";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useState } from "react";
import { generateStrongPassword } from "@/lib/utils";
import { createNewUserSchema } from "@/lib/schemas";
import addNewUser from "@/lib/actions/add-new-user";
import { useRouter } from "next/navigation";

export default function NewUserForm() {
  const form = useForm<z.infer<typeof createNewUserSchema>>({
    resolver: zodResolver(createNewUserSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "subscriber",
    },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);

  const { executeAsync, isExecuting } = useAction(addNewUser, {
    onSuccess: () => {
      toast.success("Created successfully!");
      router.push("/sp-admin/users");
    },
    onError: (error) => {
      console.log(error);
      if (
        error.error.validationErrors?.username &&
        error.error.validationErrors!.username!._errors!.length > 0
      ) {
        toast.error(error.error.validationErrors!.username!._errors![0]);
      }
      if (
        error.error.validationErrors?.email &&
        error.error.validationErrors!.email!._errors!.length > 0
      ) {
        toast.error(error.error.validationErrors!.email!._errors![0]);
      }
    },
  });

  function onSubmit(values: z.infer<typeof createNewUserSchema>) {
    executeAsync({
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">
                  Username (required)
                </FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">
                  Email (required)
                </FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">First Name</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Last Name</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">
                  Password (required)
                </FormLabel>
                <div className="col-span-6 space-y-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() =>
                      form.setValue("password", generateStrongPassword())
                    }
                  >
                    Generate Password
                  </Button>
                  <div className="flex items-center gap-2">
                    <FormControl className="">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant={"outline"}
                      className="w-32"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <>
                          <icon.EyeClosed />
                          Hide
                        </>
                      ) : (
                        <>
                          <icon.EyeOpen />
                          Show
                        </>
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Role</FormLabel>
                <div className="col-span-6">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty || isExecuting}>
          Add New User
        </Button>
      </form>
    </Form>
  );
}
