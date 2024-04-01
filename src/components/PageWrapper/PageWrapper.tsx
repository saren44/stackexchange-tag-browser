import { Box } from "@mui/material"
import React, { ReactNode } from "react"

interface PageWrapperProps {
	children: ReactNode,
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			width={'100%'}
		>
			{children}
		</Box>
	)
}