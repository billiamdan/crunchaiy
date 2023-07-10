import { QuestionDocument } from "../../../features/question/model/Question"
import { UpdateQuestionNumber } from "../../../features/question/model/UpdateQuestionNumber.interface";

const questionNumberAligner = (questions: QuestionDocument[], newElementNumber?: number, newElementId?: string) => {

  const removeItem = (array: QuestionDocument[], removeId: string) => {
    const index = array.findIndex((obj: QuestionDocument) => obj._id === removeId)
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  let index: number = 0
  let questionsLength: number = questions.length || 0
  let indexModificator: number = 1
  let numberModificator: number = 1
  let newQuestionNumberIsGreaterThanPrevious: boolean = false

  let idIsPresentedInStoredArray: any
  let numberIsPresentedInStoredArray: any
  const storedArr: QuestionDocument[] | undefined = [...questions]
  const containerArr: UpdateQuestionNumber[] = []

  if (questions) {
    if (newElementNumber) {
        index = newElementNumber - 1
        indexModificator = 0
        numberModificator = 2
      if (newElementId && newElementNumber) {
            idIsPresentedInStoredArray = storedArr.find((obj: QuestionDocument) => {return obj._id === newElementId});
            numberIsPresentedInStoredArray = storedArr.find((obj: QuestionDocument) => {
              return obj.number == newElementNumber});
          if (numberIsPresentedInStoredArray.number && newElementNumber && newElementNumber === idIsPresentedInStoredArray.number) {
            return containerArr
          } else if (idIsPresentedInStoredArray.number && newElementNumber && newElementNumber < idIsPresentedInStoredArray.number) {
            index = newElementNumber - 1
            numberModificator = 2
          } else if (idIsPresentedInStoredArray.number && newElementNumber && newElementNumber > idIsPresentedInStoredArray.number) {            
            questionsLength = newElementNumber
            index = idIsPresentedInStoredArray.number - 1
            numberModificator = 1
            newQuestionNumberIsGreaterThanPrevious = true

          }
          removeItem(storedArr, newElementId)
      }
    }

    for (let i = index; i < questionsLength; i++) {
          if (storedArr[i] && i + indexModificator !== storedArr[i].number) {
              if (newQuestionNumberIsGreaterThanPrevious && newElementNumber && i === newElementNumber - 1) {
                  i++
              } else {
                  containerArr.push({id: storedArr[i]._id, number: i + numberModificator});
              }
        }
      }
      return containerArr
    }
  }
  export default questionNumberAligner;