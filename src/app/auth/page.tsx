import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { AuthRedirect } from "@/components/auth/auth-redirect"
import { Rocket } from "lucide-react"
import Link from "next/link"

export default function AuthenticationPage() {
  return (
    <>
      <AuthRedirect to="/" />
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center">
              <Rocket className="mr-2 h-6 w-6" />
              TutorAI
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The beautiful thing about learning is that no one can take it away from you.&rdquo;
              </p>
              <footer className="text-sm">B.B. King</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                      Enter your email below to login to your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                      Enter your details below to create your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <SignupForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
