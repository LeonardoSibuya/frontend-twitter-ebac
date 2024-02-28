"use client";

import * as S from './styles'

import ModalSignIn from '../components/ModalSignIn'
import ModalSignUp from '../components/ModalSignUp'

import { Container } from "../styles"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    // Verifica se a sessão está carregando (loading)
    if (status === "loading") {
        console.log("Carregando a sessão...");
        return;
    }

    if (session) {
        console.log("Sessão existente:", session);
        router.replace("/homepage");
    }

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