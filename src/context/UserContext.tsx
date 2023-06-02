import React, { useState, createContext} from 'react';
import { User } from '../db/db';
import { UserContextType } from '../db/db';
import { populate } from '../db/populate';
import DefaultUser from '../constants/DefaultUser';

type UserContextProviderProps = {
	children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

	return (
	<UserContext.Provider value = {{ user, setUser }}>
		{children}
	</UserContext.Provider>
	)
}