import { useState } from "react"
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object({
    fullName: yup.string().required("Please input your full name"),
    email: yup.string().email("Email format invalid").required("Please input your email"),
    password: yup.string()
        .required()
        .min(8, "Password must be at least 8 characters")
        .test(
            "at-least-one-uppercase-letter",
            "Password must contain at least one uppercase letter",
            (value) => {
                if (!value) return false;
                return /[A-Z]/.test(value);
            }
        )
        .test(
            "at-least-one-number",
            "Password must contain at least one number",
            (value) => {
                if (!value) return false;
                return /\d/.test(value);
            }
        )
        .test(
            "at-least-one-special-char",
            "Password must contain at least one special character",
            (value) => {
                if (!value) return false;
                return /[!@#$%^&*(),.?":{}|<>]/.test(value);
            }
        ),
    confirmPassword: yup.string()
        .required()
        .oneOf([yup.ref("password"), ""], "Passwords do not match"),
});

const useRegister = () => {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleVisiblePassword = (key: "password" | "confirmPassword") => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key],
        })
    }

    const {control, handleSubmit,formState:{errors},reset,setError} = useForm({
        resolver: yupResolver(registerSchema),
    });

    const registerService = async (payload:IRegister) => {
        const result = await authServices.register(payload);
        return result;
    };

    const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,
        onError(error) {
            setError("root",{
                message: error.message,
            });
        },
        onSuccess: () =>{
            router.push("/auth/register/success");
            reset();
        }
    });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors
    }
}

export default useRegister;