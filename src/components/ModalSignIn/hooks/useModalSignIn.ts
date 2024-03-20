import { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/react';

import { SignInUserRequest } from '../validations/SignIn-user-request';
import userArray from '@/Utils/User';
import { useUser } from '@/app/contexts/UserContext';

const useModalSignIn = () => {
    const [isSubmited, setIsSubmited] = useState(false)
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const router = useRouter()

    const { users, fetchUsers } = useUser()

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const emailNolExists = (email: string) => {
        const lowerCaseEmail = email.toLowerCase();
        const isEmailInUse = users.some((user: any) => user.email.toLowerCase() === lowerCaseEmail);

        return isEmailInUse;
    };

    const validatingdUser = async () => {
        const { email, password } = formik.values

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            console.log(result)
            return;
        }

        setIsSubmited(true)
        setTimeout(() => {
            router.replace('/homepage');
        }, 3000)
    }

    const formik = useFormik<SignInUserRequest>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo é obrigatório')
                .test('emailExists', 'Este e-mail não está cadastrado', emailNolExists),
            password: Yup.string()
                .min(5, 'A senha está incorreta')
                .required('O campo é obrigatório')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'A senha está incorreta'
                ),
        }),
        onSubmit: validatingdUser
    })

    return {
        formik,
        isSubmited,
        passwordIsVisible,
        setPasswordIsVisible,
    }
}

export default useModalSignIn