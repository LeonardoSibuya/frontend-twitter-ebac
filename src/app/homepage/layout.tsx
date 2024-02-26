"use client";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

interface PrivateLayoutProps {
    children: React.ReactNode
}

export default function Client({ children }: PrivateLayoutProps) {
    const { data: session, status } = useSession();

    const router = useRouter();

    if (status === "loading") {
        return null; 
    }

    if (!session) {
        router.replace("/");
        return null;
    }

    return (
        <div>
            {children}
        </div>
    )
}