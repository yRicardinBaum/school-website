"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/auth/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  email: z.email("Email inválido."),
  password: z
    .string()
    .min(8, "A senha precisa conter no mínimo 8 caracteres.")
    .max(16, "A senha so pode conter ate no máximo 16 caracteres."),
});

export default function SignInCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (response.error) {
      form.setError("password", { message: "" });
      toast.error("Erro ao logar", {
        description: response.error.message,
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  }

  return (
    <Card className="w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-lg md:text-xl">Login</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Digite seu email e senha para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="email_test@test.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                );
              }}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Senha
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        type="password"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                );
              }}
            />
            <Button className="w-full" type="submit" form="form-rhf-demo">
              {form.formState.isSubmitting || form.formState.isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <p> Login </p>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
