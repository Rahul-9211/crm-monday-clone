
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import TicketCard from "../components/TicketCard"
import CategoriesContext from "../context/context"

const Dashboard = () => {

    // const tickets = [
    //     {
    //         category: 'Q1 2022',
    //         color: 'red',
    //         title: 'NFT Safety 101 Video',
    //         owner: 'Ania Kubow',
    //         avatar: 'https://www.freecodecamp.org/news/content/images/size/w60/2021/05/ania-kubow-gravatar.jpeg',
    //         status: 'done',
    //         priority: 5,
    //         progress: 40,
    //         description:
    //             'Make a video showcasing how to work with NFTs safely, including how to know if one is not genuine.',
    //         timestamp: '2022-02-11T07:36:17+0000',
    //     },
    //     {
    //         category: 'Q1 2022',
    //         color: 'red',
    //         title: 'Build and Sell an AI Model',
    //         owner: 'Ania Kubow',
    //         avatar: 'https://www.freecodecamp.org/news/content/images/size/w60/2021/05/ania-kubow-gravatar.jpeg',
    //         status: 'working on it',
    //         priority: 4,
    //         progress: 20,
    //         description:
    //             'Show how easy it is to work with machine Learning and show people how to make money by building and selling an AI API',
    //         timestamp: '2022-02-13T07:36:17+0000',
    //     },
    //     {
    //         category: 'Q1 2022',
    //         color: 'red',
    //         title: 'My top tools for 2022',
    //         owner: 'Ania Kubow',
    //         avatar: 'https://www.freecodecamp.org/news/content/images/size/w60/2021/05/ania-kubow-gravatar.jpeg',
    //         status: 'stuck',
    //         priority: 10,
    //         progress: 60,
    //         description:
    //             'Share my top tools for 2022 with everyone in a 15 minute video.',
    //         timestamp: '2022-02-16T07:36:17+0000',
    //     },
    //     {
    //         category: 'Q2 2022',
    //         color: 'blue',
    //         title: 'Frogger in React',
    //         owner: 'Ania Kubow',
    //         avatar: null,
    //         status: '',
    //         priority: 2,
    //         progress: 100,
    //         description:
    //             'Make a video showing how to build the popular retro game Frogger in React.',
    //         timestamp: '2022-02-21T07:36:17+0000',
    //     },
    // ]


    const [tickets, setTickets] = useState(null)
    // const [categories , setcategories] = useState(null)
    const { categories, setCategories } = useContext(CategoriesContext)


    useEffect(() => {
        async function getData() {
            const response = await axios.get('http://localhost:8000/tickets')
            console.log("response", response.data.data)
            setTickets(response.data.data)
        }
        getData();
    }, [])

    useEffect(()=>{
        setCategories([...new Set(tickets?.map(({ category }) => category))])
    },[tickets])

    const colors = [
        'rgb(255, 179,186)',
        'rgb(255, 223,186)',
        'rgb(255, 255,186)',
        'rgb(186, 255,201)',
        'rgb(186, 255,255)',
    ]
    const uniqueCategories = [
        ...new Set(tickets?.map(({ category }) => category))
    ]


    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
                {/* {console.log("tickets", tickets)} */}
                {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) =>
                (
                    <div key={categoryIndex}>
                        <h3>{uniqueCategory}</h3>
                        {tickets.map((filteredTicket, _index) => {
                            if (filteredTicket.category === uniqueCategory) {
                                console.log(`filtered Ticket ${_index}`, filteredTicket)
                                return (
                                    <TicketCard
                                        id={_index}
                                        color={colors[categoryIndex] || colors[0]}
                                        ticket={filteredTicket}
                                    />
                                )
                            }
                        })}


                    </div>
                )
                )}
            </div>

        </div>
    )
}
export default Dashboard;