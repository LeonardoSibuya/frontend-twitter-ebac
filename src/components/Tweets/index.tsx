"use client"

import Link from 'next/link'
import * as S from './styles'

import { TimeIcon } from "@chakra-ui/icons"

export type PropsTweet = {
    name: string,
    tweet: string
    created_at: Date
    profile?: string
}

const Tweets = ({ name, tweet, created_at, profile }: PropsTweet) => {

    const formattedDate = created_at.toLocaleString();

    return (
        <S.Tweet>
            <S.TweetInfo>
                <Link href={`/profiles/${profile}`}>{name}</Link>
                <TimeIcon width="12px" />
                <span>
                    {formattedDate}
                </span>
            </S.TweetInfo>

            <S.TweetText>
                {tweet}
            </S.TweetText>
        </S.Tweet>
    )
}

export default Tweets