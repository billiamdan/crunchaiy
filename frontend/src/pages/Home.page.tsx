import { useEffect } from "react";
import HeaderComponent from "../features/question/components/Header.component";
import QuestionComponent from "../features/question/components/Question.component";
import { useAppDispatch, useAppSelector } from "../hooks/input/redux/hooks";
import { getQuestions } from "../features/question/QuestionSlice";
import { Grid } from "@mui/material";
import QuestionFormComponent from "../features/question/components/QuestionForm.component";

const HomePage = () => {
  const dispatch = useAppDispatch()
  const {questions} = useAppSelector((state) => state.question)
  useEffect(( ) => {
    dispatch(getQuestions())
  }, [])

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
      </div>
    </div>
  )
}

export default HomePage;