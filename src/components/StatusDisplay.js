

const StatusDisplay = ({ status }) => {
    const getcolor = (status) => {
        let color
        switch (status) {
            case 'done':
                color = 'rgb(186,255,201)'
                break;
            case 'working on it':
                color = 'rgb(255,223,186)'
                break;
            case 'working on it':
                color = 'rgb(255,179,186)'
                break;

            default:
                color = 'rgb(186,255,255)'
                break;
        }
        return color;
    }
    return (
        <div className="status-display" style={{backgroundColor:   getcolor(status) }}>
            {status}
        </div>
    )

}
export default StatusDisplay;