import blankAvatar from "../images/blank-profile.png"
import TicketCard from "./TicketCard";

const AvtarDisplay = ({ticket}) => {
    return (
        <div className="avatar-container">
            <div className="img-container">
                <img src={ticket.avatar ?ticket.avatar : blankAvatar } alt={'photo of' + ticket.avatar}/>
            </div>
        </div>
    )

}
export default AvtarDisplay;