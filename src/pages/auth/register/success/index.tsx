import Image from "next/image"
import { Button, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/AuthLayout";
const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <AuthLayout>
          <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-3xl font-bold text-danger-500">Create Account Success</h1>
                  <p className="text-sm mb-4">
                    <Link href="/auth/login" className="font-semibold text-primary">
                    Login here
                    </Link>
                </p>
              </div>
          </div>
        </AuthLayout>
    )
}
export default RegisterSuccess;