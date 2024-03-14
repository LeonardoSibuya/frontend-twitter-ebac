"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import Image from "next/image"

import { Container } from "@/styles"

import profileImg from '../../../../public/profile.png'
import Tweets from "@/components/Tweets"

import UserArray from "@/Utils/User"
import LoadingScreen from "@/components/LoadingScreen"

const Profiles = () => {
    const { data: session } = useSession()
    const { name } = useParams();

    const userFound = UserArray.find((u) => u.name.toLowerCase() === name.toString().toLowerCase())

    const userLoged = userFound!.name === session?.user?.name ? true : false

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 3000)
    }, [])

    return (
        <>
            {isLoaded ? (
                <>
                    <section>
                        <Container>
                            {userFound ? (
                                <>
                                    <div>
                                        <Image src={profileImg} alt="" />
                                        <span>
                                            {userFound?.name}
                                        </span>
                                    </div>
                                    <ul>
                                        <li>Tweets: {userFound.tweets?.length}</li>
                                        <li>Seguindo: {userFound.follows?.length}</li>
                                        <li>Seguidores: {userFound.followers?.length}</li>
                                    </ul>

                                    <span />

                                    <ul>
                                        <li>
                                            {/* <Tweets
                                    name={"Leonardo"}
                                    tweet={"fafafa"}
                                    created_at={new Date()}
                                /> */}
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <h2>Usuario não encontrado</h2>
                                </>
                            )}
                        </Container>
                    </section>
                </>
            ) : (
                <>
                    <LoadingScreen />
                </>
            )}
        </>
    )
}

export default Profiles