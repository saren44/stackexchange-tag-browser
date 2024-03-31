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
				>
					Name
				</TableCell>
				<TableCell
					align='left'
					padding='normal'
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
			<i className={`devicon-${tagData.name}-plain`} style={{ fontSize: 30, color: 'black'}} ></i>
		</TableCell>
		<TableCell
			component="th"
			id={`enhanced-table-checkbox-${tagData.name}`}
			scope="row"
			padding="none"
			>
			{tagData.name}
		</TableCell>
		<TableCell align="left">{tagData.count}</TableCell>
		<TableCell align="right">
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
		</TableCell>
	</TableRow>
	)
}


export const TagTable = () => {


	return(
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx= {{ maxHeight: 300}}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
						stickyHeader
          >
            <TagTableHeader/>
            <TableBody>
              {mockTagData.map((row) => <TagTableRow tagData={row} key={row.name}/>)}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </Box>
	)
}

