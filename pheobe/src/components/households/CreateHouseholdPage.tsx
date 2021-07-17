import { Button, Grid, TextField, Typography } from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { DefaultLayout } from '../layouts/DefaultLayout'
import Image from 'next/image'
import LoginImage from '../../../public/images/login-icon.svg'

export const CreateHouseholdPage = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<String | null>(null)
	const [name, setName] = useState<String>('')
	const user = supabase.auth.user()

	async function createHousehold() {
		let householdId = null
		setErrorMessage(null)
		{
			const { data, error } = await supabase.from('households').insert({ name })
			if (error) {
				setErrorMessage(error.message)
				return
			}
			householdId = (data as any)[0].id
			console.log('householdid', householdId)
			console.log('data', data)
			console.log('userid', user?.id)
		}
		{
			const { data, error } = await supabase
				.from('members')
				.insert({ household_id: householdId, type: 'admin', user_id: user?.id })
			if (error) {
				setErrorMessage(error.message)
				return
			}
		}
		router.push('/getting-started/add-chores')
		setName('')
	}

	return (
		<DefaultLayout>
			<Grid container direction='column' alignItems='center'>
				<Grid item>
					<Image src={LoginImage} />
				</Grid>
				<Grid item>
					<Typography variant='h2'>Create Household</Typography>
				</Grid>
				<Grid item>
					<Typography>
						Create a household to begin tracking chores and make your house work
						fun!
					</Typography>
				</Grid>
				<Grid item>
					<TextField
						label='Household Name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</Grid>
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
				<Grid item>
					<Button
						variant='outlined'
						disabled={name.length === 0}
						onClick={() => createHousehold()}
					>
						<Typography>Next</Typography>
					</Button>
				</Grid>
			</Grid>
		</DefaultLayout>
	)
}
