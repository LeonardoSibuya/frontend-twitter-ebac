import * as S from './styles'

import useModalSignUp from './hooks/useModalSignUp'

import { HashLoader } from 'react-spinners'

import bgModal from '../../../public/background-modal.jpg'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'


const ModalSignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        formik,
        isSubmited,
        confirmIsVisible,
        passwordIsVisible,
        setConfirmIsVisible,
        setPasswordIsVisible
    } = useModalSignUp()

    return (
        <>
            <Button onClick={onOpen}>Criar conta</Button>

            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay backgroundColor={'#00000053'} />

                <ModalContent
                    background={`url(${bgModal.src})`}
                    backgroundSize="cover"
                    backgroundRepeat='no-repeat'
                    backgroundPosition="center"
                    borderRadius={'16px'}
                    minHeight={'60vh'}
                    padding={'24px 0px'}
                    boxShadow="4px 4px 4px 2px #000"
                >
                    <ModalHeader>
                        <S.ModalTitle>
                            Crie sua Conta
                        </S.ModalTitle>
                    </ModalHeader>
                    <ModalCloseButton color="#fff" />

                    <form action={formik.submitForm}>
                        {isSubmited ? (
                            <>
                                <Box
                                    margin='24px auto 0'
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <HashLoader
                                        color="#36d7b7"
                                        loading
                                        size={80}
                                        speedMultiplier={0.8}
                                    />
                                </Box>
                            </>
                        ) : (
                            <>
                                <ModalBody>
                                    <S.InputContainer>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='Insira seu nome de usúario'
                                                className={
                                                    formik.touched.name
                                                        &&
                                                        formik.errors.name
                                                        ? 'error'
                                                        :
                                                        formik.touched.name
                                                            &&
                                                            !formik.errors.name
                                                            ? 'success' : ''
                                                }
                                                id='name'
                                                name='name'
                                                value={formik.values.name}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />

                                            <span>
                                                {formik.errors.name}
                                            </span>
                                        </div>

                                        <div>
                                            <input
                                                type="email" placeholder='Insira seu email'
                                                className={
                                                    formik.touched.email
                                                        &&
                                                        formik.errors.email
                                                        ? 'error'
                                                        :
                                                        formik.touched.email
                                                            &&
                                                            !formik.errors.email
                                                            ? 'success' : ''
                                                }
                                                id='email'
                                                name='email'
                                                value={formik.values.email}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            <span>
                                                {formik.errors.email}
                                            </span>
                                        </div>

                                        <div>
                                            <S.DivPassword>
                                                {passwordIsVisible ? (
                                                    <>
                                                        <ViewOffIcon
                                                            color='#fff'
                                                            cursor='pointer'
                                                            position='absolute'
                                                            right='8px'
                                                            top='22px'
                                                            onClick={() => setPasswordIsVisible(!passwordIsVisible)} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ViewIcon
                                                            color='#fff'
                                                            cursor='pointer'
                                                            position='absolute'
                                                            right='8px'
                                                            top='22px'
                                                            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                                                        />
                                                    </>
                                                )}
                                            </S.DivPassword>
                                            <input
                                                type={passwordIsVisible ? 'text' : 'password'}
                                                placeholder='Crie sua senha'
                                                className={
                                                    formik.touched.password
                                                        &&
                                                        formik.errors.password
                                                        ? 'error'
                                                        :
                                                        formik.touched.password
                                                            &&
                                                            !formik.errors.password
                                                            ? 'success' : ''
                                                }
                                                id='password'
                                                name='password'
                                                value={formik.values.password}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            <span>
                                                {formik.errors.password}
                                            </span>
                                        </div>

                                        <div>
                                            <S.DivPassword>
                                                {confirmIsVisible ? (
                                                    <>
                                                        <ViewOffIcon
                                                            color='#fff'
                                                            cursor='pointer'
                                                            position='absolute'
                                                            right='8px'
                                                            top='22px'
                                                            onClick={() => setConfirmIsVisible(!confirmIsVisible)} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ViewIcon
                                                            color='#fff'
                                                            cursor='pointer'
                                                            position='absolute'
                                                            right='8px'
                                                            top='22px'
                                                            onClick={() => setConfirmIsVisible(!confirmIsVisible)}
                                                        />
                                                    </>
                                                )}
                                            </S.DivPassword>
                                            <input
                                                type={confirmIsVisible ? 'text' : 'password'}
                                                placeholder='Confirme sua senha'
                                                className={
                                                    formik.touched.confirmPassword
                                                        &&
                                                        formik.errors.confirmPassword
                                                        ? 'error'
                                                        :
                                                        formik.touched.confirmPassword
                                                            &&
                                                            !formik.errors.confirmPassword
                                                            ? 'success' : ''
                                                }
                                                id='confirmPassword'
                                                name='confirmPassword'
                                                value={formik.values.confirmPassword}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            <span>
                                                {formik.errors.confirmPassword}
                                            </span>
                                        </div>
                                    </S.InputContainer>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        type='submit'
                                        onSubmit={() => {
                                            formik.handleSubmit()
                                        }
                                        }
                                        backgroundColor={'#D7DBDC'}
                                        width={'80%'}
                                        margin={'0 auto'}
                                        borderRadius={'24px'}
                                    >
                                        Avançar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalSignUp