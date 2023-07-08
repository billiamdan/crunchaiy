
import { QuestionDocument } from "../../../features/question/model/Question"




//, addedElement?: number
const questionNumberAligner = (questions: any, newElementNumber?: number) => {
    //const {questions} = useAppSelector((state) => state.questions)
    //const sortedquestions = questions.sort((a, b) => {a.number - b.number})
    // console.log(questions)
    //console.log ("newElementNumber " + newElementNumber)
    if (questions) {
      const storedArray: QuestionDocument[] = questions
      //console.log(storedArray)

      const found = storedArray.find((obj) => {
        //console.log ("newElementNumber " + newElementNumber)
        return obj.number === newElementNumber;
      });
      console.log("found")
      console.log(found)
      //const addedElementPosition = storedArray.indexOf(found)
    // const found: any = questions.find((item: QuestionDocument) => {item.number === addedElement})
      
      const addedElementPosition = questions.indexOf(found)
    // console.log("addedElementPosition " + addedElementPosition)
      const index = addedElementPosition >= 0 ? addedElementPosition : 0
      //console.log("index " + index)
    // if (addedElementPosition !== 0) {
    //   questions[addedElementPosition].number = questions[addedElementPosition].number +1
    // }
      let numberModificator = 0
      let indexModificator = 1
      newElementNumber && newElementNumber > 0 ? numberModificator = 1 : numberModificator = 0
      newElementNumber && newElementNumber > 0 ? indexModificator = 0 : indexModificator = 1

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
