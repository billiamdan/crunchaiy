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
import { useAppDispatch, useAppSelector } from "../../../hooks/input/redux/hooks";
import { openModal } from "../../modal/modalSlice";
import { startLoading } from "../QuestionsLoadingSlice";
import questionNumberAligner from "../../../shared/utils/numberAligner/numberAligner";
import { updateQuestionsBulk } from "../UpdateQuestionsBulkSlice";

interface QuestionComponentProps {
    question: QuestionDocument,
}

const QuestionComponent: FC<QuestionComponentProps> = ({question}) => {

    const dispatch = useAppDispatch();
    const {questions} = useAppSelector((state) => state.getQuestions)

    const questionRemover = async (id: string, questions: QuestionDocument[]) => {
        let firstResult;
        const number = 0;
        try {
            let secondResult;
            firstResult = await dispatch(updateQuestionsBulk(questionNumberAligner(questions, number, id)))
            if(firstResult) {
                    secondResult = await dispatch(deleteQuestion(id));
                if(secondResult) {
                    dispatch(startLoading());
                }
            }
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    const deleteHandler = useCallback(() => {
        questionRemover(question._id, questions)
    }, [question._id, questions]);

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