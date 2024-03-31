import Modal, { ModalProps } from '@mui/material/Modal'
import { useModalManager } from '../../hooks/useModalManager'
import { Typography } from '@mui/material'
import { ICollective } from '../TagsTable/TagsTableNew';
import Box from '@mui/material/Box'

export interface ITagData {
	name: string,
	count: number,
	has_synonyms: boolean,
	is_moderator_only: boolean,
	is_required: boolean,
	synonyms?: Array<string>,
}


export interface IInfoModalProps {
	infoData: ITagData
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


export const InfoModal = ({
	infoData
}: IInfoModalProps) => {
	const onClose = useModalManager((state) => state.closeModal)



	return (
		<Modal
			open={true}
			onClose={onClose}
		>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${infoData.name} details`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`count: ${infoData.count}`}
          </Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`moderator only? ${infoData.is_moderator_only}`}
          </Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`required: ${infoData.is_required}`}
          </Typography>
					{ infoData.synonyms &&
					<>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							{`synonyms:`}
						</Typography>
						<Box>
							{
								infoData.synonyms.map((el) => (
									<Typography id="modal-modal-description" sx={{ mt: 1 }} key={el}>
										{el}
								</Typography>
								))
							}
						</Box>
					</>

					}

        </Box>
		</Modal>
	)
}