import { Button, Grid, Typography } from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { NoAuthLayout } from '../layouts/NoAuthLayout'
import Image from 'next/image'
import GoogleIcon from '../../../public/images/google-icon.svg'
import LoginImage from '../../../public/images/login-icon.svg'

export const LoginPage = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<String | null>(null)

	async function loginWithGoogle() {
		setErrorMessage(null)
		const { data, error } = await supabase.auth.signIn({ provider: 'google' })
		if (error) {
			setErrorMessage(error.message)
			return
		}
		router.push('/getting-started/create-household')
	}

	return (
		<NoAuthLayout>
			<Grid container direction='column' alignItems='center'>
				<Grid item>
					<Typography variant='h2'>Household</Typography>
				</Grid>
				<Grid item>
					<Image src={LoginImage} />
				</Grid>
				<Grid item>
					<Typography variant='h4'>Household chores made fun!</Typography>
				</Grid>
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
				<Grid item>
					<Button variant='outlined' onClick={() => loginWithGoogle()}>
						<Image src={GoogleIcon} />
						<Typography>Login With Google</Typography>
					</Button>
				</Grid>
			</Grid>
		</NoAuthLayout>
	)
}
