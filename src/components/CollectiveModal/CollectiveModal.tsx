import Modal from '@mui/material/Modal'
import { useModalManager } from '../../hooks/useModalManager'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ICollective } from '../../hooks/types'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export interface ICollectiveModalProps {
	collectiveData: Array<ICollective>
}

interface ICollectiveRundownProps {
	data: ICollective
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid',
	borderColor: 'primary.main',
  boxShadow: 24,
  p: 4,
	maxHeight: '60%',
	overflowY: 'auto',
	color: 'primary.main',
};

const CollectiveRundown = ({ data }: ICollectiveRundownProps) => {

	return (
		<>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{`${data.name}`}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{data.description}
				</Typography>
				<Link id="modal-modal-description" sx={{ mt: 2 }} href={`https://stackoverflow.com${data.link}`} target="_blank">
					Website
				</Link>
		</>

	)
}


export const CollectiveModal = ({
	collectiveData
}: ICollectiveModalProps) => {
	const onClose = useModalManager((state) => state.closeModal)



	return (
		<Modal
			open={true}
			onClose={onClose}
		>
        <Box sx={style}>
					<Box 
						position={'absolute'}
						top={'20px'}
						right={'20px'}
					>
						<IconButton onClick={onClose}>
							<Close />
						</IconButton>
					</Box>
          {collectiveData.map((el) => <CollectiveRundown data={el} key={el.name} />)}
        </Box>
		</Modal>
	)
}