import axios from "axios"


const DeleteBlock = ({uniqueId}) => {

    console.log("deltede" , uniqueId)
    const deleteTicket = async ()=>{
      const response  =  await axios.delete(`http://localhost:8000/tickets/${uniqueId}`)
      console.log("response", response)
      const success = response.status === 200
      if(success){
          window.location.reload()
      }
    }

    const deleteClick = ( ) => {
    }
    return (
        <div className="delete-block">
            <div className="delete-icon" onClick={deleteTicket}>x</div>
        </div>
    )

}
export default DeleteBlock;