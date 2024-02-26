import * as S from './styles'

import { TimeIcon } from "@chakra-ui/icons"

const Tweets = () => {
    return (
        <S.Tweet>
            <S.TweetInfo>
                <a href=''>Nome tal</a>
                <TimeIcon width="12px" />
                <span>
                    há 4h
                </span>
            </S.TweetInfo>

            <S.TweetText>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta repellat magni laborum quo. Consequatur rem quae nam est illo itaque perferendis, excepturi autem quam laborum nesciunt magnam architecto at quos.
            </S.TweetText>
        </S.Tweet>
    )
}

export default Tweets