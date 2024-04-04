import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { mockTagData } from "./mockData"

import IconButton from '@mui/material/IconButton';
import Groups from '@mui/icons-material/Groups';
import Info from '@mui/icons-material/Info';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import { useModalManager } from '../../hooks/useModalManager';
import { CollectiveModal } from '../CollectiveModal/CollectiveModal';
import { InfoModal } from '../InfoModal/InfoModal';
import { TableFooter } from '@mui/material';
import { useEffect, useState } from 'react';
import { visuallyHidden } from '@mui/utils'
import { Primary, Secondary } from '../../stories/Button.stories';
import { useTagData, useTagFilter } from '../../hooks';
import { IData } from '../../hooks/types';
import { ITagData } from '../../hooks/types';

import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";




const TagTableHeader = () => {

	return (
		<TableHead>
			<TableRow>
				<TableCell
					padding='checkbox'
				>

				</TableCell>
				<TableCell
					align='left'
					padding='none'
					sx={{ width: '20%'}}
				>
						Name
				</TableCell>
				<TableCell
					align='left'
					padding='normal'
					sx={{ width: '20%'}}
				>
					Count
				</TableCell>
				<TableCell
					align='right'
					padding='none'
				>

				</TableCell>
			</TableRow>

		</TableHead>
	)
}

interface ITagTableRowProps {
	tagData: IData
}

const TagTableRow = ({
	tagData
}: ITagTableRowProps) => {

	const openModal = useModalManager((state) => state.openModal)


	const handleOpenLink = () => {
		window.open(`https://stackoverflow.com/questions/tagged/${tagData.name}`, '_blank')
	}

	const handleOpenCollectiveModal = () => {
		if (!tagData.collectives){
			return;
		}
		openModal(<CollectiveModal collectiveData={tagData.collectives} />)
	}

	const handleOpenInfoModal = () => {
		openModal(<InfoModal infoData={tagData as ITagData} />)
	}

	return (
		<TableRow
		tabIndex={-1}
		key={tagData.name}

		>
		<TableCell padding='checkbox'>
			<Typography className={`devicon-${tagData.name}-plain`} sx={{ fontSize: 24 }} color={'primary'}></Typography>
		</TableCell>
		<TableCell
			component="th"
			id={`enhanced-table-checkbox-${tagData.name}`}
			scope="row"
			padding="none"
			align='left'
			>
				
			{tagData.name}
		</TableCell>
		<TableCell align="left" padding='none'>{tagData.count}</TableCell>
		<TableCell align="right" size='medium'>
			<Box>
				{
					tagData.collectives && (
						<IconButton onClick={handleOpenCollectiveModal}>
						<Groups />
					</IconButton>
					)}
				<IconButton onClick={handleOpenInfoModal}>
					<Info />
				</IconButton>
				<IconButton onClick={handleOpenLink}>
					<OpenInNewRounded />
				</IconButton>
			</Box>

		</TableCell>
	</TableRow>
	)
}

interface ITagTableProps {
	loading: boolean;
	error: boolean;
	data: IData[] | null;	
	errorMsg: string | null;
}



export const TagTable = ({
	loading,
	error,
	data,
	errorMsg,
}: ITagTableProps) => {



	if (loading) {
		return <>
			<Dots />
			<Typography> loading </Typography>
		</>
	}

	if (error) {
		return (
			<>
				<Typography color={'red'}>
					Error!
				</Typography>
				<Typography color={'red'}>
					{errorMsg}
				</Typography>
			</>

		)
	}

	if (data === null || data.length === 0) {
		return (
			<>
			<Typography color={'red'}>
				No results for the specified query
			</Typography>
		</>
		)			

	}

	return(
    <Box sx={{ width: '100%', height: '100%' }} >
      <Paper sx={{ width: '100%', mb: 2, height: '100%' }}>
        <TableContainer sx={{ backgroundColor: 'background.default'}}>
          <Table
            sx={{ minWidth: 300, }}
            aria-labelledby="tableTitle"
            size={'small'}
						stickyHeader
          >
            <TagTableHeader />
            <TableBody sx= {{ overflowX: 'hidden' }}>
              {data.map((row) => <TagTableRow tagData={row} key={row.name}/>)}
            </TableBody>
          </Table>

        </TableContainer>
      </Paper>
    </Box>
	)
}

export const TagTableWrapper = () => {
	const data = useTagData((state) => state.data)
	const loading = useTagData((state) => state.loading)
	const error = useTagData((state) => state.error)
	const execute = useTagData((state) => state.execute)
	const errorMsg = useTagData((state) => state.errorMessage)

	useEffect(() => {
		data === null && execute()
	}, [])

	return <TagTable data={data} loading={loading} error={error} errorMsg={errorMsg}/>
}
