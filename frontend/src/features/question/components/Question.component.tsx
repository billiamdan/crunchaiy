import { FC, useCallback, useEffect} from "react";
import { QuestionDocument } from "../model/Question";
import { 
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import { deleteQuestion } from "../GetQuestionsSlice";
import { useAppDispatch } from "../../../hooks/input/redux/hooks";
import { openModal } from "../../modal/modalSlice";
import { startLoading } from "../QuestionsLoadingSlice";

interface QuestionComponentProps {
    question: QuestionDocument
}

const QuestionComponent: FC<QuestionComponentProps> = ({question}) => {

    const dispatch = useAppDispatch();

    const deleteHandler = useCallback(() => {
        console.log(question._id)
        dispatch(deleteQuestion(question._id))
        dispatch(startLoading())
    }, [question._id]);

    const handleOpenModal = () => {
        dispatch(openModal(question));
    };
  
   

  return (
    <Card sx={{width: 450, minWidth: 450}}>
        <CardContent>
            <Grid container direction='row' justifyContent='space-between'>
                <Typography gutterBottom variant='h5' component='div'>
                    Question number: {question.number}
                </Typography>
                <Button style={{cursor: 'pointer'}} onClick={handleOpenModal}>Edit</Button>
                <Button style={{cursor: 'pointer'}} onClick={deleteHandler}>Remove</Button>
            </Grid>
            <Typography gutterBottom variant='h5' component='div'>
                {question.question}
            </Typography>
            <Grid container direction='row' justifyContent='space-between' >
                <Typography gutterBottom variant='h5' component='div'>
                    {question.firstAnswer}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                    {question.secondAnswer}
                </Typography>
            </Grid>
        </CardContent>
        <CardActions sx={{dislay: 'flex', justifyContent: 'space-between'}}/>
    </Card>
  )
}

export default QuestionComponent