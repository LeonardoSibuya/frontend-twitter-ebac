import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik'
import * as Yup from 'yup'

const useModalSignIn = () => {
    const [isSubmited, setIsSubmited] = useState(false)

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const router = useRouter()

    const userValid = () => {
        console.log('usuario valido')
        setIsSubmited(true)

        setTimeout(() => {
            router.push('/');
        }, 3000)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('E-mail inválido')
                .required('O campo é obrigatório'),
            password: Yup.string()
                .min(5, 'A senha está incorreta')
                .required('O campo é obrigatório')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'A senha está incorreta'
                ),
        }),
        onSubmit: userValid
    })

    return {
        formik,
        isSubmited,
        passwordIsVisible,
        setPasswordIsVisible,
    }
}

export default useModalSignIn