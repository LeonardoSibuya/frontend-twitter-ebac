import Link from 'next/link'
import * as S from './styles'

type Props = {
    title: string
    username: string[]
}

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

const ModalFollows = ({ title, username }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <S.SectionModal>
            <Button
                className='buttonModal'
                onClick={onOpen}
                backgroundColor='transparent'
                fontSize='18px'
                color='#8e8e8e'
                fontFamily='"Kode Mono", monospace;'
                fontWeight='normal'
                padding='0 4px'
            >
                {title}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backgroundColor={'#000000a0'} />

                <ModalContent
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    gap='16px'
                    backgroundColor='#000'
                    color='#fff'
                    boxShadow='1px 1px 6px #14659b'
                    height="60vh"
                    borderRadius="24px"
                    margin={'40px 24px'}
                >
                    <ModalHeader>
                        <S.TitleModal>
                            {title}
                        </S.TitleModal>
                    </ModalHeader>

                    <ModalCloseButton color="#fff" />

                    <ModalBody>
                        <S.ListUsers>
                            {username.map((user, index) => ( // Usar index como chave
                                <li key={index}>
                                    <Link
                                        href={`/profiles/${user}`}
                                    >
                                        @{user}
                                    </Link>
                                </li>
                            ))}
                        </S.ListUsers>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </S.SectionModal>
    )
}

export default ModalFollows