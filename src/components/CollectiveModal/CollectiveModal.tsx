import Modal, { ModalProps } from '@mui/material/Modal'
import { useModalManager } from '../../hooks/useModalManager'
import { Typography } from '@mui/material'
import { ICollective } from '../TagsTable/TagsTableNew';
import Box from '@mui/material/Box'


export interface ICollectiveModalProps {
	collectiveData: Array<ICollective>
}

interface ICollectiveRundownProps {
	data: ICollective
}


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
	color: 'black',
	maxHeight: '60%',
	overflowY: 'auto',
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
          {collectiveData.map((el) => <CollectiveRundown data={el} key={el.name} />)}
        </Box>
		</Modal>
	)
}