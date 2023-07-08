import { useEffect } from "react";
import HeaderComponent from "../features/question/components/Header.component";
import QuestionComponent from "../features/question/components/Question.component";
import { useAppDispatch, useAppSelector } from "../hooks/input/redux/hooks";
import { getQuestions } from "../features/question/GetQuestionsSlice";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import QuestionFormComponent from "../features/question/components/QuestionForm.component";
import ModalWindow from "../features/modal/components/modalComponent";
import questionNumberAligner from "../shared/utils/numberAligner/numberAligner";
import { updateQuestionsBulk } from "../features/question/UpdateQuestionsBulkSlice";
import { startLoading, stopLoading } from "../features/question/QuestionsLoadingSlice";
import { RootState } from "../store";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '650px',
  bgcolor: 'background.paper',
  border: '2px solid #cccccc',
  boxShadow: 24,
  p: 4,
  padding: 2
};

const HomePage = () => {
  const dispatch = useAppDispatch()
  const questionsIsLoading = useAppSelector((state: RootState) => state.questionsLoading.questionsIsLoading);
  const {isLoading, isSuccess} = useAppSelector((state) => state.getQuestions);
  const {addQuestionIsSuccess} = useAppSelector((state) => state.addQuestion);
  const {updateQuestionIsSuccess} = useAppSelector((state) => state.updateQuestion);
  const {questions} = useAppSelector((state) => state.getQuestions)
  

  useEffect(( ) => {
      dispatch(getQuestions())
      dispatch(stopLoading())
      console.log("questions recieved")
  }, [questionsIsLoading, addQuestionIsSuccess, updateQuestionIsSuccess])

  useEffect(( ) => {
    if(!questionsIsLoading)
      dispatch(updateQuestionsBulk(questionNumberAligner(questions)))
  }, [questionsIsLoading])

  function startLoadingHandler () {
    dispatch(startLoading());
  }

  if (isLoading) return <CircularProgress sx={{marginTop: '64px'}} color='primary'/>
  return (
    <div>
      <HeaderComponent/>
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '48px', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '48px'
      }}>
        <Grid container spacing={1} style={{margin: '0 50px'}}>
          <Grid container item xs={4}>
            <QuestionFormComponent/>
          </Grid>
          <Grid container item xs={8} direction='column' justifyContent='flex-start' gap='20px'>
            {questions.length > 0 && questions.map((questionObj) => 
              <QuestionComponent 
                key={questionObj._id} 
                question={questionObj}
                />)}
          </Grid>
        </Grid>
        <ModalWindow>
          <Box sx={style}>
          </Box>
        </ModalWindow>
        <Button onClick={startLoadingHandler}>Get questions</Button>
      </div>
    </div>
  )
}

export default HomePage;

