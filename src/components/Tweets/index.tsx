"use client"

import Link from 'next/link'
import * as S from './styles'

import { DeleteIcon, TimeIcon } from "@chakra-ui/icons"
import { Button } from '@chakra-ui/react'

export type PropsTweet = {
    id: number
    name: string,
    tweet: string
    created_at: string
    profile?: string
    isHomepage: boolean
    isUserLogedPage?: boolean
    deleteButton?: (id: number) => void
}

const Tweets = ({ name, tweet, created_at, profile, isHomepage, id, deleteButton, isUserLogedPage }: PropsTweet) => {

    const date = new Date()

    return (
        <S.Tweet>
            <S.TweetInfo>
                {isHomepage ? (
                    <Link href={`/profiles/${profile}`}>
                        @{name}
                    </Link>
                ) : (
                    <S.NameSpan>
                        @{name}
                    </S.NameSpan>
                )}
                <TimeIcon width="12px" />
                <S.Date>
                    {created_at}
                </S.Date>
            </S.TweetInfo>

            <S.TweetText>
                {tweet}
            </S.TweetText>
            {
                isHomepage ? '' :
                    <Button
                        className='buttonDelete'
                        position="absolute"
                        top="0"
                        right="0"
                        backgroundColor="transparent"
                        borderRadius="16px"
                        color="#fff"
                        type='button'
                        display={isUserLogedPage ? "block" : "none"}
                        onClick={() => deleteButton!(id)}>
                        <DeleteIcon />
                    </Button>
            }
        </S.Tweet>
    )
}

export default Tweets