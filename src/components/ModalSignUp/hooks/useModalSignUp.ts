"use client"

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import UserArray, { UserInterface } from '@/Utils/User';
import { signIn } from 'next-auth/react';

const useModalSignUp = () => {
    const [isSubmited, setIsSubmited] = useState(false)

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [confirmIsVisible, setConfirmIsVisible] = useState(false)


    const router = useRouter()

    const userValid = async () => {
        const { name, confirmPassword, email, password } = formik.values;

        try {
            const newUser: UserInterface = {
                id: (UserArray.length + 1).toString(),
                name: name,
                email: email,
                confirmPassword: confirmPassword,
                password: password,
            };

            console.log('Novo usuário adicionado:', newUser);

            UserArray.push(newUser);

            console.log('Array de usuários após adição:', UserArray);

            // Autenticar o novo usuário manualmente
            await signIn('credentials', {
                email: newUser.email,
                password: newUser.password,
                redirect: false,
            });

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

    const formik = useFormik<UserInterface>({
        initialValues: {
            id: '',
            name: '',
            email: '',
            // userGitHub: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'O nome deve conter pelo menos 3 caracteres')
                .required('O campo é obrigatório'),
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo é obrigatório'),
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