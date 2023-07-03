import { useEffect } from "react";
import HeaderComponent from "../features/question/components/Header.component";
import QuestionComponent from "../features/question/components/Question.component";
import { useAppDispatch, useAppSelector } from "../hooks/input/redux/hooks";
import { getQuestions } from "../features/question/QuestionsSlice";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import QuestionFormComponent from "../features/question/components/QuestionForm.component";
import ModalWindow from "../features/modal/components/modalComponent";
import { openModal } from "../features/modal/modalSlice";
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

  const {isLoading, isSuccess} = useAppSelector((state) => state.questions);
  const {questions} = useAppSelector((state) => state.questions)
  useEffect(( ) => {
    dispatch(getQuestions())
  }, [])

  // const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);
  //   if (!isOpen) return null;
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
          <Grid item xs={4}>
            <QuestionFormComponent/>
          </Grid>
          <Grid item xs={8} direction='column' justifyContent='flex-start' gap='20px'>
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
      </div>
    </div>
  )
}

export default HomePage;

