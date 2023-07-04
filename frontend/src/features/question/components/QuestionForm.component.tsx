import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { FC, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/input/redux/hooks";
import useInput from "../../../hooks/input/use-input";
import { validateQuestionLength } from "../../../shared/utils/validation/length";
import { NewQuestion } from "../model/NewQuestion";
import { addQuestion, resetForm, updateQuestion } from "../QuestionsSlice";
import { startLoading } from "../questionLoadingSlice";
import { RootState } from "../../../store";
import { DisplayQuestion } from "../model/DisplayQuestion.interface";

const QuestionFormComponent: FC = () => {

        const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);
        const questionObj = useAppSelector((state: RootState) => state.modal.question);
        const id = questionObj?._id
        console.log(id)

        const dispatch = useAppDispatch();
    
        const {isLoading, isSuccess} = useAppSelector((state) => state.questions);

        useEffect(() => {
            if (isSuccess) {
                dispatch(resetForm())
                clearForm();
            }
        }, [isSuccess])

        useEffect(() => {
            if (isOpen && questionObj) {
                setDeafaulValue()
            } else {
                clearForm();
            }
        }, [isOpen])

        const {
            text: number,
            deafultValueHandler: numberDeafultValueHandler,
            inputChangeHandler: numberChangeHandler,
            inputBlurHandler: numberBlurHandler,
            inputClearHandler: numberClearHandler,
        } = useInput()
    
        const {
            text: question,
            shouldDisplayError: questionHasError,
            deafultValueHandler: questionDeafultValueHandler,
            inputChangeHandler: questionChangeHandler,
            inputBlurHandler: questionBlurHandler,
            inputClearHandler: questionClearHandler,
        } = useInput(validateQuestionLength)
    
        const {
            text: firstAnswer,
            shouldDisplayError: firstAnswerHasError,
            deafultValueHandler: firstAnswerDeafultValueHandler,
            inputChangeHandler: firstAnswerChangeHandler,
            inputBlurHandler: firstAnswerBlurHandler,
            inputClearHandler: firstAnswerClearHandler,
        } = useInput(validateQuestionLength)
    
        const {
            text: secondAnswer,
            shouldDisplayError: secondAnswerHasError,
            deafultValueHandler: secondAnswerDeafultValueHandler,
            inputChangeHandler: secondAnswerChangeHandler,
            inputBlurHandler: secondAnswerBlurHandler,
            inputClearHandler: secondAnswerClearHandler,
        } = useInput(validateQuestionLength)
    
        const clearForm = () => {
            numberClearHandler();
            questionClearHandler();
            firstAnswerClearHandler();
            secondAnswerClearHandler();
        }

        const setDeafaulValue = () => {
            if (questionObj) {
                numberDeafultValueHandler(questionObj.number);
                questionDeafultValueHandler(questionObj.question);
                firstAnswerDeafultValueHandler(questionObj.firstAnswer);
                secondAnswerDeafultValueHandler(questionObj.secondAnswer);
            } 
        }
    
      const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (
            question.length === 0 || 
            firstAnswer.length === 0 || 
            secondAnswer.length === 0
            ) return;
    
            const newQuestion: NewQuestion = {
              number, 
              question, 
              firstAnswer, 
              secondAnswer
            }

        if(isOpen && questionObj) {
            const existingQuestion: DisplayQuestion = {
                id: questionObj._id,
                number, 
                question, 
                firstAnswer, 
                secondAnswer,
            }
            dispatch(updateQuestion(existingQuestion))
        } else {
            dispatch(addQuestion(newQuestion))
        }
        dispatch(startLoading())
    }

    if (isLoading) return <CircularProgress sx={{marginTop: '64px'}} color='primary'/>
  return (
    <form onSubmit={onSubmitHandler}>
        <Grid container direction='column' width='400px' justifyContent='flex-start' gap='20px'>
            <TextField
                value={number}
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                type='number' 
                name='number' 
                id="outlined-number"
                variant='outlined' 
                size='small'
                label="Required"
                InputLabelProps={{
                    shrink: true,
                    }}
            />
            <TextField
                value={question}
                onChange={questionChangeHandler}
                onBlur={questionBlurHandler}
                error={questionHasError}
                helperText={questionHasError ? 'Enter your question' : ''}
                type='text'
                name='question' 
                id='question' 
                variant='outlined' 
                size='small'
                required
                label="Required"
                
            />
            <TextField
                value={firstAnswer}
                onChange={firstAnswerChangeHandler}
                onBlur={firstAnswerBlurHandler}
                error={firstAnswerHasError}
                helperText={firstAnswerHasError ? 'Enter your #1 Answer' : ''}
                type='text' 
                name='firstAnswer' 
                id='firstAnswer' 
                variant='outlined' 
                size='small'
                required
                label="Required"
            />
            <TextField
                value={secondAnswer}
                onChange={secondAnswerChangeHandler}
                onBlur={secondAnswerBlurHandler}
                error={secondAnswerHasError}
                helperText={secondAnswerHasError ? 'Enter your #2 Answer' : ''}
                type='text' 
                name='secondAnswer' 
                id='secondAnswer' 
                variant='outlined' 
                size='small'
                required
                label="Required"
            />
            <Button 
                id='add-question-btn'
                variant='contained' 
                type='submit'
                style={{
                    marginTop: '16px', 
                    height: '31px', 
                    backgroundColor: '#38a32a', 
                    color: 'black', 
                    borderColor: '#2e963d #4c9141 #499b4a', 
                    textTransform: 'none'}}>
                {isOpen ? "Update question" : "Add question"}
            </Button>
        </Grid>
    </form>
  )
}

export default QuestionFormComponent