import React, { createContext, useState } from 'react'

export interface UserContextProps {
    userId: string | null
    setUserId: React.Dispatch<React.SetStateAction<string | null>>
}

const UserContext = createContext<UserContextProps>({
    userId: null,
    setUserId: () => {}
})

interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null)

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
