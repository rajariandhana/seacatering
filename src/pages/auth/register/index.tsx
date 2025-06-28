import AuthLayout from "@/components/AuthLayout";
import Image from "next/image";
import { Card,CardBody,Input,Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye,FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import Logo from "@/components/Logo";
// import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  const {visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors} = useRegister();
    return (
      <AuthLayout title="Register">
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          <Card radius="sm">
                <CardBody className="p-8">
                    <div className="w-full flex justify-center mt-24 mb-24">
                        <Logo height={20}></Logo>
                    </div>
                    <h2 className="text-xl font-bold text-primary">Create Account</h2>
                    <p className="text-sm mb-4">Have an account? &nbsp;
                        <Link href="/auth/login" className="font-semibold text-primary">
                        Login here
                        </Link>
                    </p>
                    {errors.root && 
                        (<p className="mb-2 font-medium text-primary">
                            {errors?.root?.message}
                        </p>)
                    }
                    <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2":"gap-4")} onSubmit={handleSubmit(handleRegister)}>
                        <Controller name="fullName" control={control} render={({field}) => 
                            <Input {...field} type="text" label="Fullname" variant="bordered" autoComplete="off"  radius="sm"
                                isInvalid={errors.fullName !== undefined} errorMessage={errors.fullName?.message}>
                            </Input>
                        }/>
                        <Controller name="email" control={control} render={({field}) => 
                            <Input {...field} type="email" label="Email" variant="bordered" autoComplete="off"  radius="sm">
                                isInvalid={errors.email !== undefined} errorMessage={errors.email?.message}
                            </Input>
                        }/>
                        <Controller name="password" control={control} render={({field}) => 
                            <Input {...field} type={visiblePassword.password ? 'text':'password'} label="Password" variant="bordered" autoComplete="off"  radius="sm"
                                isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}
                                endContent={
                                    <button className="foxcus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("password")}>
                                        {visiblePassword.password ? (
                                            <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                        ):(
                                            <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                                )}
                                </button>
                                }>
                    
                            </Input>
                        }/>
                        <Controller name="confirmPassword" control={control} render={({field}) => 
                            <Input {...field} type={visiblePassword.confirmPassword ? 'text':'password'} label="Password Confirmation" variant="bordered" autoComplete="off"  radius="sm"
                                isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message}
                                endContent={
                                    <button className="foxcus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("confirmPassword")}>
                                        {visiblePassword.confirmPassword ? (
                                            <FaEye className="text-xl text-default-400 pointer-events-none"/>
                                        ):(
                                            <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                                )}
                                </button>
                                }>
                    
                            </Input>
                        }/>
                        <Button color="primary" size="lg" type="submit"  radius="sm">
                            {isPendingRegister ? <Spinner color="white" size="sm"/> : 'Register'}
                        </Button>
                    </form>
                </CardBody>
          </Card>
        </div>
      </AuthLayout>
    )
}

export default RegisterPage;