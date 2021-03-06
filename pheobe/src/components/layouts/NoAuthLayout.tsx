import Head from 'next/head'
import React from 'react'
import { WaitForNoAuth } from '../auth/WaitForNoAuth'

interface Props {
	title?: string
	children: React.ReactNode
}

export const NoAuthLayout = ({ title, children }: Props) => {
	return (
		<WaitForNoAuth>
			{title ? (
				<Head>
					<title>Households | {title}</title>
				</Head>
			) : null}

			<main
				/**
				 * Padding top = `appbar` height
				 * Padding bottom = `bottom-nav` height
				 */
				className='mx-auto pt-20 pb-16 max-w-screen-md'
			>
				<div className='p-6'>{children}</div>
			</main>
		</WaitForNoAuth>
	)
}
