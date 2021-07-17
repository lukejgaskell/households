import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Chore } from './Chore.type'
import { ChoreCard } from './ChoreCard'
import { defaultChores } from './constants'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export const AddDefaultChoresPage = () => {
	const router = useRouter()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const [errorMessage, setErrorMessage] = useState<String | null>(null)
	const [chores, setChores] = useState<Set<Chore>>(new Set())
	const [open, setOpen] = React.useState(false)
	const [editChore, setEditChore] = useState<Chore>({} as Chore)

	const handleClose = () => {
		setOpen(false)
		setEditChore({} as Chore)
	}

	const handleAddChore = () => {
		setOpen(false)
		setChores(chores.add(editChore))
		setEditChore({} as Chore)
	}

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

	async function createChore() {
		setOpen(true)
	}

	return (
		<DefaultLayout>
			<Grid container direction='column' alignItems='center'>
				<Grid item>
					<Typography variant='h2'>Add Custom Chores</Typography>
				</Grid>
				{defaultChores.map((chore) => (
					<Grid item>
						<ChoreCard {...chore} isSelected={true} />
					</Grid>
				))}
				<Grid item>
					<IconButton aria-label='add' color='primary' onClick={createChore}>
						<AddCircleIcon />
					</IconButton>
				</Grid>
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
				<Grid item>
					<Button variant='outlined' onClick={() => addChores()}>
						<Typography>Next</Typography>
					</Button>
				</Grid>
			</Grid>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby='responsive-dialog-title'
			>
				<DialogTitle id='responsive-dialog-title'>
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Let Google help apps determine location. This means sending
						anonymous location data to Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button
						onClick={handleAddChore}
						color='primary'
						disabled={!editChore.name || !(editChore.difficulty > 0)}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</DefaultLayout>
	)
}
