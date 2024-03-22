"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

import { endpoint } from "@/app/contexts/UserContext";

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { User } from '@/Utils/User';

import { signIn } from 'next-auth/react';
import { useUser } from '@/app/contexts/UserContext';

const useModalSignUp = () => {
    const [isSubmited, setIsSubmited] = useState(false)

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [confirmIsVisible, setConfirmIsVisible] = useState(false)

    const router = useRouter()

    const { users, fetchUsers } = useUser()

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const emailExists = (email: string) => {
        const lowerCaseEmail = email.toLowerCase();
        const isEmailInUse = users.some((user) => user.email.toLowerCase() === lowerCaseEmail);

        return !isEmailInUse;
    };

    const userValid = async () => {
        const { name, email, password } = formik.values;

        try {
            const response = await axios.post(`${endpoint}/`, {
                name,
                email,
                password,
            });

            fetchUsers();

            setTimeout(async () => {
                await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false,
                });
            }, 3000);

            setIsSubmited(true);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    useEffect(() => {
        if (isSubmited) {
            setTimeout(() => {
                router.replace('/homepage');
            }, 3000)
        }
    }, [router, isSubmited]);

    const formik = useFormik<User>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'O nome deve conter pelo menos 3 caracteres')
                .required('O campo é obrigatório'),
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo é obrigatório')
                .test('emailExists', 'Este e-mail já está em uso', emailExists),
            userGitHub: Yup.string()
                .min(3, 'O nome de usúario deve conter pelo menos 3 caracteres e ser válido'),
            password: Yup.string()
                .min(5, 'A senha deve conter pelo menos 5 caracteres')
                .required('O campo é obrigatório')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'Deve conter pelo menos uma letra maiúscula, um número e um caractere especial'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'A senha está incorreta')
                .required('O campo é obrigatório'),
        }),
        onSubmit: userValid
    })

    return {
        formik,
        isSubmited,
        confirmIsVisible,
        passwordIsVisible,
        setPasswordIsVisible,
        setConfirmIsVisible,
    }
}

export default useModalSignUp