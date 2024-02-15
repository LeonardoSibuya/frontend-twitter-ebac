"use client"

import * as S from './styles'

import ModalSignIn from '@/components/ModalSignIn'
import ModalSignUp from '@/components/ModalSignUp'

import { Container } from "@/styles"

const Login = () => {
    return (
        <S.LoginContainer>
            <S.Content>
                <Container>

                    <S.SubscribeTitle>
                        Inscreva-se agora
                    </S.SubscribeTitle>

                    <S.CreateAccountDiv>
                        <ModalSignUp />
                        <p>
                            Ao se inscrever, você concorda com os <span>Termos de Serviço</span> e a <span>Política de Privacidade</span>, incluindo o <span>Uso de Cookies</span>.
                        </p>
                    </S.CreateAccountDiv>

                    <S.AlreadyAccount>
                        <p>
                            Já tem uma conta?
                        </p>
                        <ModalSignIn />
                    </S.AlreadyAccount>

                </Container>
            </S.Content>
        </S.LoginContainer>
    )
}

export default Login