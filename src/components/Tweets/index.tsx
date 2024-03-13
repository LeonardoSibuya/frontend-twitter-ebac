import * as S from './styles'

import { TimeIcon } from "@chakra-ui/icons"

type Props = {
    name: string,
    tweet: string
    created_at: string
}

const Tweets = ({ name, tweet, created_at }: Props) => {

    return (
        <S.Tweet>
            <S.TweetInfo>
                <a href=''>{name}</a>
                <TimeIcon width="12px" />
                <span>
                    {created_at}
                </span>
            </S.TweetInfo>

            <S.TweetText>
                {tweet}
            </S.TweetText>
        </S.Tweet>
    )
}

export default Tweets