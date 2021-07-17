import { Card, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Chore } from './Chore.type'

type IProps = Chore & { isSelected: boolean }

export const ChoreCard = ({ name, difficulty, id, isSelected }: IProps) => {
	return (
		<Card>
			<Grid container alignItems='center'>
				<Grid item>
					<Typography variant='h2'>{name}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h2'>{`${difficulty} Pts`}</Typography>
				</Grid>
			</Grid>
		</Card>
	)
}
