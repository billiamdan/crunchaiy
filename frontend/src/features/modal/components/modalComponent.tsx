import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

interface ModalProps {
  children: ReactNode;
  title?: string;
}

const ModalWindow: FC<ModalProps> = ({ children, title }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} aria-labelledby="modal-title">
        <IconButton aria-label="close" onClick={handleCloseModal}>
            <ClearIcon  style={{cursor: 'pointer'}} />
        </IconButton>
        <QuestionFormComponent/>
      {/* {title && (
        <DialogTitle id="modal-title">
          {title}
          
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent> */}
    </Dialog>
  );
};

export default ModalWindow;