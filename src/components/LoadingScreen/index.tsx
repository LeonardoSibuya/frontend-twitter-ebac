import { Content } from "./styles"

import { HashLoader } from "react-spinners"

const LoadingScreen = () => {
    return (
        <Content>
            <HashLoader
                color="#36d7b7"
                loading
                size={160}
                speedMultiplier={0.8}
            />
        </Content>
    )
}

export default LoadingScreen