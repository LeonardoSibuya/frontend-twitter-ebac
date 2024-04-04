"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import * as S from './styles'

import Image from 'next/image';

import { BeatLoader } from 'react-spinners';
import { MoonIcon, Search2Icon, ChatIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

import profile from '../../../public/profile.png'

import LoadingScreen from '@/components/LoadingScreen';
import Tweets from '@/components/Tweets';

import useHomepage from './hooks/useHomepage';
import Link from 'next/link';

const Homepage = () => {

  const {
    handlePostTweet,
    handleTweetChange,
    logout,
    openSideBar,
    searchingUser,
    setSearchUser,
    verifyIsSearch,
    formatCreatedAt,
    isLoaded,
    isLogoff,
    newTweet,
    session,
    tweets,
    isOpen,
    isSearch,
    profileLoged,
  } = useHomepage()


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
              <S.ButtonMobile onClick={openSideBar}>
                {isOpen ? (
                  <>
                    <CloseIcon width='14px' color="#fff" />
                  </>
                ) : (
                  <>
                    <HamburgerIcon width='18px' color="#fff" />
                  </>
                )}
              </S.ButtonMobile>

              {isOpen ? (
                <>
                  <S.Aside>
                    <h1>
                      <span>ebac</span>-X
                    </h1>
                    <S.ListLinks>
                      <li>
                        <Search2Icon width='14px' display={isSearch ? 'none' : 'block'} />
                        <input
                          type="text"
                          placeholder='Usuários'
                          onChange={(e) => {
                            setSearchUser(e.target.value);
                            verifyIsSearch(e.target.value);
                          }}
                        />
                        {isSearch ?
                          <S.ButtonSearchUser
                            onClick={searchingUser}>
                            buscar
                          </S.ButtonSearchUser> : ''}
                      </li>

                      <li>
                        <ChatIcon width='14px' />
                        <Link href={`/messages/${profileLoged?.id}`}>
                          Mensagens
                        </Link>
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
                </>
              ) : (
                <>
                  <S.AsideMobile>
                    <h1>
                      X
                    </h1>

                    <S.ListLinks>
                      <li>
                        <Search2Icon width='14px' />
                      </li>

                      <li>
                        <ChatIcon width='14px' />
                      </li>
                    </S.ListLinks>

                    <S.ProfileDiv>
                      <MoonIcon width='14px' color="#14659b" />
                    </S.ProfileDiv>
                  </S.AsideMobile>
                </>
              )}

              <S.HomePageSection className={isOpen ? 'mobile' : ''}>
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
                    onClick={() => handlePostTweet(profileLoged!.id!, newTweet)}
                  >
                    Postar
                  </button>
                </S.CreatePostDiv>

                <S.TweetsContainer>
                  <ul>
                    {tweets?.map((tweet) => (
                      <li key={tweet.id}>
                        <Tweets
                          id={tweet.id}
                          name={tweet.name}
                          isHomepage={true}
                          profile={tweet.name}
                          created_at={formatCreatedAt(tweet?.createdAt?.toString() || new Date().toString())}
                          tweet={tweet.text}
                        />
                      </li>
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