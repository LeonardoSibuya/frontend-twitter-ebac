"use client"

import Link from 'next/link'
import * as S from './styles'

import { TimeIcon } from "@chakra-ui/icons"

export type PropsTweet = {
    name: string,
    tweet: string
    created_at: Date
    profile?: string
    isHomepage: boolean
}

const Tweets = ({ name, tweet, created_at, profile, isHomepage }: PropsTweet) => {

    const formattedDate = created_at.toLocaleString();

    return (
        <S.Tweet>
            <S.TweetInfo>
                {isHomepage ? (
                    <Link href={`/profiles/${profile}`}>{name}</Link>
                ) : (
                    <S.NameSpan>
                        {name}
                    </S.NameSpan>
                )}
                <TimeIcon width="12px" />
                <S.Date>
                    {formattedDate}
                </S.Date>
            </S.TweetInfo>

            <S.TweetText>
                {tweet}
            </S.TweetText>
        </S.Tweet>
    )
}

export default Tweets