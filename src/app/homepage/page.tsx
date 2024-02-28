"use client"

import { useEffect, useState } from 'react';

import * as S from './styles'

import Image from 'next/image';
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';


import { BeatLoader } from 'react-spinners';
import { MoonIcon, Search2Icon, TriangleUpIcon, ChatIcon } from '@chakra-ui/icons'

import profile from '../../../public/profile.png'

import LoadingScreen from '@/components/LoadingScreen';
import Tweets from '@/components/Tweets';


const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLogoff, setIsLogoff] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated" || !session) {
      console.log('Usuário não autenticado, redirecionando para /');
      router.replace("/");
    } else {
      setIsLoaded(true);
      console.log('Usuário autenticado, permitindo acesso à homepage');
    }
  }, [status, session, router]);

  const logout = async () => {
    setIsLogoff(true);

    setTimeout(() => {
      signOut({
        redirect: false,
      });

      router.replace('/');
    }, 3000);
  };

  if (status === 'loading') return; 

  return (
    <>
      {isLogoff ? (
        <S.LogoffSection>
          <S.LogoffDiv>
            <p>Saindo, por favor aguarde</p>
            <BeatLoader color="#14659b" />
          </S.LogoffDiv>
        </S.LogoffSection>
      ) : (
        <>
          {isLoaded ? (
            <S.MainContent>
              <S.Aside>
                <h1>
                  <span>ebac</span>-X
                </h1>

                <S.ListLinks>
                  <li>
                    <TriangleUpIcon width='14px' />
                    <a href="">
                      Inicial
                    </a>
                  </li>

                  <li>
                    <Search2Icon width='14px' />
                    <a href="">
                      Buscar
                    </a>
                  </li>

                  <li>
                    <ChatIcon width='14px' />
                    <a href="">
                      Mensagens
                    </a>
                  </li>
                </S.ListLinks>

                <S.ProfileDiv>
                  <MoonIcon width='14px' color="#14659b" />
                  <a href=''>
                    Olá {session?.user?.name}
                  </a>
                </S.ProfileDiv>

                <S.ButtonLogout type='button' onClick={logout}>
                  Sair
                </S.ButtonLogout>
              </S.Aside>

              <S.HomePageSection>
                <h2>Seu Feed</h2>

                <S.CreatePostDiv>
                  <Image src={profile} alt="" />
                  <textarea placeholder='O que está acontecendo?' />
                  <button>
                    Postar
                  </button>
                </S.CreatePostDiv>

                <S.TweetsContainer>
                  <Tweets />
                  <Tweets />
                  <Tweets />
                  <Tweets />
                </S.TweetsContainer>
              </S.HomePageSection>
            </S.MainContent>
          ) : (
            <section>
              <LoadingScreen />
            </section>
          )}

        </>
      )}
    </>
  );
}

export default Homepage