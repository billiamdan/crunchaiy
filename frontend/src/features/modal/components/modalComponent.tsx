import { FC, ReactNode } from 'react';
import { RootState } from '../../../store';
import { closeModal } from '../modalSlice';
import { 
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import QuestionFormComponent from '../../question/components/QuestionForm.component';
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';

interface ModalProps {
  children: ReactNode;
  title?: string;
}

const ModalWindow: FC<ModalProps> = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} aria-labelledby="modal-title">
        <IconButton aria-label="close" onClick={handleCloseModal}>
            <ClearIcon  style={{cursor: 'pointer'}} />
        </IconButton>
        <QuestionFormComponent/>
    </Dialog>
  );
};

export default ModalWindow;