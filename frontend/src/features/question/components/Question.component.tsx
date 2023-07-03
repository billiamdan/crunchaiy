import { FC, useCallback, useEffect} from "react";
import { QuestionDocument } from "../model/Question";
import { 
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { deleteQuestion, getQuestions } from "../QuestionSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/input/redux/hooks";

interface QuestionComponentProps {
    question: QuestionDocument
}

const QuestionComponent: FC<QuestionComponentProps> = ({question}) => {

    const dispatch = useAppDispatch();

    // const {isLoading, isSuccess} = useAppSelector((state) => state.questions);

    // useEffect(() => {
    //     if (isSuccess) {
    //         dispatch(getQuestions())
    //     }
    // }, [isSuccess, dispatch])

    const deleteHandler = useCallback(() => {
        console.log(question._id)
        dispatch(deleteQuestion(question._id))
        dispatch(getQuestions())
    }, [question._id]);


  return (
    <Card sx={{width: 450, minWidth: 450}}>
        <CardContent>
            <Grid container direction='row' justifyContent='space-between'>
                <Typography gutterBottom variant='h5' component='div'>
                    Question number: {question.number}
                </Typography>
                <ClearIcon style={{cursor: 'pointer'}} onClick={deleteHandler} />
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
        <CardActions sx={{dislay: 'flex', justifyContent: 'space-between'}}>
        </CardActions>
    </Card>
  )
}

export default QuestionComponent
