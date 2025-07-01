import AuthLayout from "@/components/Layouts/AuthLayout";
import { Input,Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import useLogin from "../../../utils/useLogin";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import Logo from "@/components/Logo";
import { CiMail } from "react-icons/ci";

const LoginPage = () => {
  const {isVisible, toggleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors} = useLogin();
  return (
    <AuthLayout title="Login">
        <div className="flex w-full flex-col justify-center">
            <div className="w-full flex justify-center mb-24">
                <Logo height={20}></Logo>
            </div>
            <h2 className="text-xl font-bold text-primary">Login</h2>
            <p className="text-sm mb-4">Don{"'"}t have an account? &nbsp;
                <Link href="/auth/register" className="font-semibold text-primary">
                Register here
                </Link>
            </p>
            {errors.root && 
                (<p className="mb-2 font-medium text-primary">
                    {errors?.root?.message}
                </p>)
            }
            <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2":"gap-4")} onSubmit={handleSubmit(handleLogin)}>
                <Controller name="email" control={control} render={({field}) => 
                    <Input {...field} type="email" label="Email" variant="bordered" autoComplete="off" radius="sm" startContent={<CiMail size={24}/>}>
                        isInvalid={errors.email !== undefined} errorMessage={errors.email?.message}
                    </Input>
                }/>
                <Controller name="password" control={control} render={({field}) => 
                    <Input {...field} type={isVisible ? 'text':'password'} label="Password" variant="bordered" autoComplete="off" radius="sm"
                        isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}
                        endContent={
                            <button className="foxcus:outline-none"
                            type="button"
                            onClick={() => toggleVisibility()}>
                                {isVisible ? (
                                    <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                ):(
                                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                        )}
                        </button>
                        }>
            
                    </Input>
                }/>
                <Button color="primary" size="lg" type="submit" radius="sm">
                    {isPendingLogin ? <Spinner color="white" size="sm"/> : 'Login'}
                </Button>
            </form>
        </div>
    </AuthLayout>
  )
}

export default LoginPage;