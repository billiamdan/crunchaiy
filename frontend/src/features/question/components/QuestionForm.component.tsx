import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { FC, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/input/redux/hooks";
import useInput from "../../../hooks/input/use-input";
import { validateQuestionLength } from "../../../shared/utils/validation/length";
import { NewQuestion } from "../model/NewQuestion";
import { resetForm } from "../GetQuestionsSlice";
import { startLoading } from "../QuestionsLoadingSlice";
import { RootState } from "../../../store";
import { DisplayQuestion } from "../model/DisplayQuestion.interface";
import questionNumberAligner from "../../../shared/utils/numberAligner/numberAligner";
import { updateQuestionsBulk } from "../UpdateQuestionsBulkSlice";
import { addQuestion } from "../AddQuestionSlice";
import { updateQuestion } from "../UpdateQuestionSlice";

const QuestionFormComponent: FC = () => {

        const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);
        const questionObj = useAppSelector((state: RootState) => state.modal.question);
        const {questions} = useAppSelector((state) => state.getQuestions)


        const id = questionObj?._id
        console.log(id)

        const min = 0
        const max = questions.length + 1

        const dispatch = useAppDispatch();
    
        const {isLoading, isSuccess} = useAppSelector((state) => state.getQuestions);
        const {updateQuestionIsSuccess} = useAppSelector((state) => state.updateQuestion);
        const {addQuestionIsSuccess} = useAppSelector((state) => state.addQuestion);
        const {updateQuestionsBulkIsSuccess} = useAppSelector((state) => state.updateQuestionsBulk);
        
        useEffect(() => {
            if (isSuccess) {
                dispatch(resetForm())
                clearForm();
            }
            if (updateQuestionIsSuccess || addQuestionIsSuccess) {
                dispatch(updateQuestionsBulk(questionNumberAligner(questions)))
            }
            if (updateQuestionsBulkIsSuccess) {
                startLoading()
            }
        }, [isSuccess, updateQuestionIsSuccess, addQuestionIsSuccess, updateQuestionsBulkIsSuccess])

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
            number >= questions.length + 1 ||
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

            const updateQuestionAndUpdateNumbers = async (questions: any, number?: number, id?: string) => {
                let firstResult;
                try {
                    firstResult = await dispatch(updateQuestionsBulk(questionNumberAligner(questions, number, id)));
                    if(firstResult) {
                        let secondResult;
                        secondResult = await dispatch(updateQuestion(existingQuestion));
                        if(secondResult) {
                            dispatch(startLoading());
                        }
                    }
                    
                  }
                  catch (err) {
                    console.log(err)
                  }
            }
            updateQuestionAndUpdateNumbers(questions, existingQuestion.number, existingQuestion.id)
        } else {
            const addQuestionAndUpdateNumbers = async (questions: any, number?: number) => {
                let firstResult;
                let secondResult;
                try {
                    console.log("number")
                    firstResult = await dispatch(updateQuestionsBulk(questionNumberAligner(questions, number)));
                    if(firstResult) {
                        secondResult = await dispatch(addQuestion(newQuestion));
                    }
                    if(secondResult) {
                        dispatch(startLoading());
                    }
                  }
                  catch (err) {
                    console.log(err)
                  }
            }
            addQuestionAndUpdateNumbers(questions, newQuestion.number)
        }
    }

    if (isLoading) return <CircularProgress sx={{marginTop: '64px'}} color='primary'/>
  return (
    <form onSubmit={onSubmitHandler}>
        <Grid container direction='column' width='400px' justifyContent='flex-start' gap='20px'>
            <TextField
                value={number}
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                inputProps={{ min, max }}
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