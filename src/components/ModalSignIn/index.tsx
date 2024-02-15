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

const ModalSignIn = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Entrar</Button>

            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay backgroundColor={'#242d3428'} />

                <ModalContent
                    backgroundColor={'#000'}
                    borderRadius={'16px'}
                    height={'50vh'}
                    padding={'24px 0px'}
                >
                    <ModalHeader>
                        <S.ModalTitle>
                            Entrar no Ebac-X
                        </S.ModalTitle>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <S.InputContainer>
                            <input type="email" placeholder='Insira seu email' />
                            <input type="password" placeholder='Insira sua senha' />
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

export default ModalSignIn