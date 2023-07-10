
import { QuestionDocument } from "../../../features/question/model/Question"

const questionNumberAligner = (questions: any, newElementNumber?: number, newElementId?: string) => {
  

  
    if (questions) {
      console.log("newElementNumber")
      console.log(newElementNumber)
      console.log("newElementId")
      console.log(newElementId)

      let numberModificator: number = 0;
      let indexModificator: number = 1;
      let existingQuestionNumber: any;

      newElementNumber && newElementNumber > 0 ? 
        numberModificator = 1 : 
        numberModificator = 0

      newElementNumber && newElementNumber > 0 ? 
        indexModificator = 0 : 
        indexModificator = 1

      newElementId && newElementNumber  ? 
        existingQuestionNumber = newElementNumber + 1 : 
        existingQuestionNumber = newElementNumber 

      const storedArray: QuestionDocument[] = questions

      
      const found = storedArray.find((obj) => {
          return obj.number === existingQuestionNumber
      });
   
      const addedElementPosition = questions.indexOf(found)

      const index = addedElementPosition >= 0 ? addedElementPosition : 0

    const containerArr = []
    
    for (let i = index; i < storedArray.length; i++) {
        if (storedArray[i] && i + indexModificator !== storedArray[i].number) {
          containerArr.push({id: storedArray[i]._id, number: i + 1 + numberModificator});
      }
    }
    return containerArr
    }
  }

  export default questionNumberAligner;
