import * as S from './styles'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'

const ModalSignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Criar conta</Button>

            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay backgroundColor={'#242d3428'} />

                <ModalContent
                    backgroundColor={'#000'}
                    borderRadius={'16px'}
                    height={'70vh'}
                    padding={'24px 0px'}
                >
                    <ModalHeader>
                        <S.ModalTitle>
                            Crie sua Conta
                        </S.ModalTitle>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <S.InputContainer>
                            <input type="text" placeholder='Insira seu nome de usúario' />
                            <input type="email" placeholder='Insira seu email' />
                            <input type="password" placeholder='Crie sua senha' />
                            <input type="password" placeholder='Confirme sua senha' />
                        </S.InputContainer>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            backgroundColor={'#D7DBDC'}
                            width={'80%'}
                            margin={'0 auto'}
                            borderRadius={'24px'}
                        >
                            Avançar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalSignUp