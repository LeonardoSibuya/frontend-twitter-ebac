"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import * as S from './styles'

import Image from 'next/image';

import { BeatLoader } from 'react-spinners';
import { MoonIcon, Search2Icon, TriangleUpIcon, ChatIcon } from '@chakra-ui/icons'

import profile from '../../../public/profile.png'

import LoadingScreen from '@/components/LoadingScreen';
import Tweets from '@/components/Tweets';

import useHomepage from './hooks/useHomepage';
import Link from 'next/link';

const Homepage = () => {

  const { handlePostTweet, handleTweetChange, isLoaded, isLogoff, logout, newTweet, session, tweets } = useHomepage()

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
                  <Link href={`/profiles/${session?.user?.name}`}>
                    Olá {session?.user?.name}
                  </Link>
                </S.ProfileDiv>

                <S.ButtonLogout type='button' onClick={logout}>
                  Sair
                </S.ButtonLogout>
              </S.Aside>

              <S.HomePageSection>
                <h2>Seu Feed</h2>

                <S.CreatePostDiv>
                  <Image src={profile} alt="" width={100} height={100} />
                  <textarea
                    value={newTweet}
                    onChange={handleTweetChange}
                    placeholder='O que está acontecendo?'
                  />
                  <button
                    type="button"
                    onClick={handlePostTweet}
                  >
                    Postar
                  </button>
                </S.CreatePostDiv>

                <S.TweetsContainer>
                  <ul>
                    {tweets?.map((tweet, index) => (
                      <Tweets
                        key={index}
                        name={tweet.user.name}
                        isHomepage={true}
                        profile={tweet.user.name}
                        created_at={tweet.createdAt}
                        tweet={tweet.text}
                      />
                    ))}
                  </ul>
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