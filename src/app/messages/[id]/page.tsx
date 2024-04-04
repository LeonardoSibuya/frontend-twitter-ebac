"use client"

import * as S from './styles'

import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

import profile from '../../../../public/profile.png'
import Link from 'next/link';
import { TriangleUpIcon } from '@chakra-ui/icons';


const Messages = () => {

    const { data: session, status } = useSession()
    const { name } = useParams();
    const { users, fetchUsers } = useUser()
    const router = useRouter()

    const [isLoaded, setIsLoaded] = useState(false)

    const profileLoged = users.find((u) => u.email === session!.user?.email);

    useEffect(() => {
        if (status === "loading") {
            console.log("loading")
            return;
        }
        if (status === 'authenticated' && session) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 3000)
        } else {
            router.replace("/");
        }
    }, [status, session, router]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (!session) {
        router.replace('/homepage')
        return;
    }

    return (
        <>
            {isLoaded ? (
                <S.Section>
                    <S.Aside>
                        <ul>
                            <li>
                                Jade
                            </li>
                            <li>
                                Leonardo
                            </li>
                            <li>
                                Laercio
                            </li>
                        </ul>

                        <S.ListLinks>
                            <Link href="/homepage">
                                <TriangleUpIcon width='18px' />
                                Página inicial
                            </Link>

                            <Link href={`/profiles/${profileLoged?.name}`}>
                                @ {profileLoged?.name}
                            </Link>
                        </S.ListLinks>
                    </S.Aside>

                    <S.ChatContainer>
                        <S.ChatProfile>
                            <Image src={profile} alt="" />
                            <span>
                                Jade
                            </span>
                        </S.ChatProfile>

                        <S.ListMessages>
                            <li className='receiver'>
                                Olá tudo bem?
                            </li>

                            <li className='sender'>
                                Tudo sim, e com você?
                            </li>
                        </S.ListMessages>

                        <S.TextArea placeholder='Escreva sua mensagem' />
                    </S.ChatContainer>
                </S.Section>
            ) : (
                <section>
                    <LoadingScreen />
                </section>
            )}
        </>
    )
}

export default Messages