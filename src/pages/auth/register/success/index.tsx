import Image from "next/image"
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/AuthLayout";
const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <AuthLayout>
          <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-3xl font-bold text-danger-500">Create Account Success</h1>
                  <p className="text-xl font-bold text-default-500">check your email for account activation</p>
                  <Button className="mt-4-w-fit" variant="bordered" color="danger" onClick={()=>router.push('/')}>
                      Back to Home
                  </Button>
              </div>
          </div>
        </AuthLayout>
    )
}
export default RegisterSuccess;