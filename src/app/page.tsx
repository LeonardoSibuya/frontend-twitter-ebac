'use client'

import * as S from './styles'

import Image from 'next/image';
import { MoonIcon, Search2Icon, TriangleUpIcon, ChatIcon } from '@chakra-ui/icons'

import profile from '../../public/profile.png'


export default function Home() {
  return (
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
            Seu perfil
          </a>
        </S.ProfileDiv>
      </S.Aside>

      <S.HomePageSection>
        <h2>Seu Feed</h2>

        <S.CreatePostDiv>
          <Image src={profile} alt="" />
          <textarea placeholder='O que está acontecendo?'/>
          <button>
            Postar
          </button>
        </S.CreatePostDiv>
      </S.HomePageSection>
    </S.MainContent>
  );
}
