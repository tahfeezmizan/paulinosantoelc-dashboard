"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLoginUserMutation } from "@/redux/api/authApi"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/slice/userSlice"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type FormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const router = useRouter()
  const dispatch = useDispatch()
  const [user, { isLoading }] = useLoginUserMutation()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data)

    try {
      const res = await user(data).unwrap()
      console.log("API Response:", res)

      if (!res.success) {
        toast.error(res?.message || "Login failed")
        return
      }

      // Extract role from response - ensure we're accessing the correct path
      const role = res.data?.user?.role
      console.log("User Role:", role)

      // Check if user is an admin
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        // User is an admin, proceed to dashboard
        dispatch(setUser(res))
        toast.success(res?.message || "Login successful")
        router.push("/dashboard")
      } else {
        // Not an admin, force logout
        localStorage.removeItem("email")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("persist:root")
        toast.error("You are not authorized to access the admin dashboard")
        // No need to redirect as we're already on the login page
      }
    } catch (error) {
      console.error("Login Error:", error)
      toast.error("Login failed. Please check your credentials and try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="text-blue-500 font-bold text-4xl">LOGO</div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Hi, Welcome Back! 👋</h1>
          <p className="text-gray-500">Please Enter Your Email And Password Below!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-left">
            <label className="block mb-1 font-medium">Email address</label>
            <Input
              type="email"
              placeholder="george.young@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="text-left">
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  )
}
