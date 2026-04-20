import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [state, setState] = useState("login");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        {state == "login" ? (
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
        )}

        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" onClick={() => router.push("/dashboard")}>
                  {state === "login" ? "Login" : "Sign Up"}
                </Button>

                {state == "login" ? (
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <a href="#" onClick={() => setState("signup")}>
                      Sign up
                    </a>
                  </FieldDescription>
                ) : (
                  <FieldDescription className="text-center">
                    Have an account?{" "}
                    <a href="#" onClick={() => setState("login")}>
                      Login
                    </a>
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
