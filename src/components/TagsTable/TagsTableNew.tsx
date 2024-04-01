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
import { ITagData, InfoModal } from '../InfoModal/InfoModal';
import { TableFooter } from '@mui/material';
import { useState } from 'react';
import { visuallyHidden } from '@mui/utils'
import { Primary, Secondary } from '../../stories/Button.stories';

export interface IData extends ITagData {
	collectives?: Array<ICollective>
}

export interface ICollective {
	tags: Array<string>,
	description: string,
	link: string,
	name: string,
	slug: string,
	external_links: Array<IExternalLink>
}

interface IExternalLink {
	type: string,
	link: string
}

interface ITagTableHeaderProps {
	orderBy: keyof IData,
	orderDirection: SortDir,
	onSortChange: (by: keyof IData, dir: SortDir) => void,
}

const resolveDirection = (orderBy: keyof IData, label: keyof IData, dir: SortDir) => {
	if (orderBy === label) {
		return dir === 'asc' ? 'desc' : 'asc'
	}
	return 'asc'
}

const TagTableHeader = ({
	orderBy,
	orderDirection,
	onSortChange
}: ITagTableHeaderProps) => {


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
					size='small'
				>
					<TableSortLabel
						active={orderBy === 'name'}
						direction={orderBy === 'name' ? orderDirection : 'asc'}
						onClick={() => onSortChange('name', resolveDirection(orderBy, 'name', orderDirection))}
					>
						Name
						<Box component="span" sx={visuallyHidden}>
							{'sorted ascending'}
						</Box>
					</TableSortLabel>
				</TableCell>
				<TableCell
					align='left'
					padding='normal'
					size='small'
				>
					<TableSortLabel
						active={orderBy === 'count'}
						direction={orderBy === 'count' ? orderDirection : 'asc'}
						onClick={() => onSortChange('count', resolveDirection(orderBy, 'count', orderDirection))}
					>
						Count
						<Box component="span" sx={visuallyHidden}>
							{'sorted ascending'}
						</Box>
					</TableSortLabel>
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

type SortDir = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

interface ISortDetails {
	by: keyof IData,
	dir: SortDir
}


export const TagTable = () => {
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [sortDetails, setSortDetails] = useState<ISortDetails>({by: 'count', dir: 'desc'})



	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
		//console.log(page)
		setCurrentPage(page)
	}

	const handleSortChange = (by: keyof IData, dir: SortDir) => {
		setSortDetails({by, dir})
	}

	return(
    <Box sx={{ width: '100%', height: '100%' }} >
      <Paper sx={{ width: '100%', mb: 2, height: '100%' }}>
        <TableContainer color={'secondary'}>
          <Table
            sx={{ minWidth: 300, }}
            aria-labelledby="tableTitle"
            size={'small'}
						stickyHeader
          >
            <TagTableHeader orderBy={sortDetails.by} orderDirection={sortDetails.dir} onSortChange={handleSortChange}/>
            <TableBody sx= {{ overflowX: 'hidden' }}>
              {mockTagData.map((row) => <TagTableRow tagData={row} key={row.name}/>)}
            </TableBody>
          </Table>

        </TableContainer>
      </Paper>
    </Box>
	)
}

