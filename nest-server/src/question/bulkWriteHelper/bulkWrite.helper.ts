
  
function bulkWriteInstruction  (array: any) {
    const bulkWritehelper = array.map((item: any) => ({
          updateOne: {
            filter: { _id: item.id },
            update: {
              $set: {
                number: item.number
              }
            }
          }
        }));
        return bulkWritehelper
     }
export default bulkWriteInstruction  