import React from 'react'
import { useVerifyLoggedIn } from './useVerifyAuth'

type WaitForAuthProps = {}

export const WaitForAuth: React.FC<WaitForAuthProps> = ({ children }) => {
	if (!useVerifyLoggedIn()) {
		return null
	}

	return <>{children}</>
}
