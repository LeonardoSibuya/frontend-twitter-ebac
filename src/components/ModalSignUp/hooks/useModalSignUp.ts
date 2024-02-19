import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik'
import * as Yup from 'yup'

const useModalSignUp = () => {
    const [isSubmited, setIsSubmited] = useState(false)

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [confirmIsVisible, setConfirmIsVisible] = useState(false)

    const router = useRouter()

    const userValid = () => {
        console.log('usuario criado')
        setIsSubmited(true)

        setTimeout(() => {
            router.push('/');
        }, 3000)
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'O nome deve conter pelo menos 3 caracteres')
                .required('O campo é obrigatório'),
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo é obrigatório'),
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