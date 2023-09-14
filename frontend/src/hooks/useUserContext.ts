import { useContext } from 'react'
import UserContext, { UserContextProps } from '../contexts/UserContext'

const useUserContext = (): UserContextProps => {
    return useContext(UserContext)
}

export default useUserContext
