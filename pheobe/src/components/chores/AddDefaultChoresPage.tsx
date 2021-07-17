import { Button, Grid, Typography } from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Chore } from './Chore.type'
import { ChoreCard } from './ChoreCard'
import { defaultChores } from './constants'

export const AddDefaultChoresPage = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<String | null>(null)
	const [chores, setChores] = useState<Set<Chore>>(new Set())

	async function addChores() {
		setErrorMessage(null)
		const { data, error } = await supabase.from('chores').insert(chores)
		if (error) {
			setErrorMessage(error.message)
			return
		}
		router.push('/')
		setChores(new Set())
	}

	async function selectChore(chore: Chore) {
		setChores(chores.add(chore))
	}

	return (
		<DefaultLayout>
			<Grid container direction='column' alignItems='center'>
				<Grid item>
					<Typography variant='h2'>Select Chores</Typography>
				</Grid>
				{defaultChores.map((chore) => (
					<Grid item onClick={() => selectChore(chore)}>
						<ChoreCard {...chore} isSelected={chores.has(chore)} />
					</Grid>
				))}
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
				<Grid item>
					<Button variant='outlined' onClick={() => addChores()}>
						<Typography>Next</Typography>
					</Button>
				</Grid>
			</Grid>
		</DefaultLayout>
	)
}
