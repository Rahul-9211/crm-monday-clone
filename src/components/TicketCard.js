import AvtarDisplay from "./AvatarDisplay";
import StatusDisplay from "./StatusDisplay"
import PriorityDisplay from "./PriorityDisplay"
import ProgressDisplay from "./ProgressDisplay"
import DeleteBlock from "./DeleteBlock"
import { Link } from "react-router-dom";

const TicketCard = ({ ticket, color }) => {
    return (
        <div className="ticket-card">
            <Link to={`/tickets/${ticket.uniqueId}`} id="link">
                <div className="ticket-color" style={{ backgroundColor: color }}></div>
                <h3>{ticket.title}</h3>
                <AvtarDisplay
                    ticket={ticket} />
                <StatusDisplay status={ticket.status} />
                <PriorityDisplay priority={ticket.priority} />
                <ProgressDisplay progress={ticket.progress} />
            </Link>
            <DeleteBlock uniqueId={ticket.uniqueId}/>
        </div>
    )

}
export default TicketCard;