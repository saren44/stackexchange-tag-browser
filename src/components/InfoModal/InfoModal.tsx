import { useModalManager } from '../../hooks'
import { ITagData } from '../../hooks/types';
import { IconButton, Modal, Typography, Box } from '@mui/material';
import { Close } from '@mui/icons-material';




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
  border: '2px solid',
	borderColor: 'primary.main',
  boxShadow: 24,
  p: 4,
	maxHeight: '60%',
	overflowY: 'auto',
	color: "primary.main",
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
				<Box 
					position={'absolute'}
					top={'20px'}
					right={'20px'}
				>
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
				</Box>
					<Typography id="modal-modal-title" variant="h5">
						{`${infoData.name}`}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{`count: ${infoData.count}`}
					</Typography>
					{
						infoData.is_moderator_only &&
						<Typography id="modal-modal-description" sx={{ mt: 2, textDecoration: 'underline' }}>
							{`moderator only`}
						</Typography>
					}
					{
						infoData.is_required &&
						<Typography id="modal-modal-description" sx={{ mt: 2, textDecoration: 'underline' }}>
							{`required`}
						</Typography>
					}
					{ infoData.synonyms &&
					<>
						<Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
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