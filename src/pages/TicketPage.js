import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import CategoriesContext from "../context/context"


const TicketPage = ({editmode}) => {
    const { categories , setcategories} = useContext(CategoriesContext)
    const [formData, setformData] = useState({
        status: 'not started',
        progress: 0,
        category : categories[0],
        timestamp: new Date().toISOString()
    })

    // const editmode = false

    const navigate = useNavigate();
    let {id} = useParams()

    const handleSubmit =async (e) => {
        e.preventDefault()

        if(editmode){
            const response = await axios.put(`http://localhost:8000/tickets/${id}` , {
                data : formData
            })
            const success = response.status === 200
            if(success){
                navigate('/')
            }
        }

        if(!editmode){
            const response = await axios.post('http://localhost:8000/tickets', {
               formData
            })
            const success = response.status === 200
            if(success){
                navigate('/')
            }
        }
        console.log("submitted")
    }

    const  fetchData = async () =>{
       const response =  await axios.get(`http://localhost:8000/tickets/${id}`)
       console.log("res" , response.data)
       setformData(response.data.data)
    }

    useEffect(()=>{
        console.log("editmode" , editmode) 
        if(editmode){
            fetchData()
        }
    },[])

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setformData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // const categories = ['test1', 'test2']
    // console.log(formData)

    return (
        <div className="ticket">
            <h1>{editmode ? "update ur ticket" : 'create a ticket'}</h1>
            <div className="ticket-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.title}
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.description}
                        />

                        <label >Category</label>
                        <select name="category"
                            value={formData.category || 'New Category'}
                            onChange={handleChange}
                        >
                            {categories?.map((category, _index) => (
                                <option key={_index} value={category} >{category}</option>
                            ))}

                        </select>

                        <label htmlFor="new-category">New category</label>
                        <input
                            id="new-category"
                            name="category"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.category}
                        />

                        <label>Priority</label>
                        <div className="multiple-input-container">
                            <input
                                id="priority-1"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                required={true}
                                checked={formData.priority == 1}
                                value={1}
                            />
                            <label htmlFor="priority-1">1</label>

                            <input
                                id="priority-2"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                required={true}
                                checked={formData.priority == 2}
                                value={2}
                            />
                            <label htmlFor="priority-2">2</label>
                            <input
                                id="priority-3"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                required={true}
                                checked={formData.priority == 3}
                                value={3}
                            />
                            <label htmlFor="priority-3">3</label>
                            <input
                                id="priority-4"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                required={true}
                                checked={formData.priority == 4}
                                value={4}
                            />
                            <label htmlFor="priority-4">4</label>
                            <input
                                id="priority-5"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                required={true}
                                checked={formData.priority == 5}
                                value={5}
                            />
                            <label htmlFor="priority-5">5</label>

                        </div>

                        {editmode && 
                        <>
                            <input
                                type="range"
                                id="progress"
                                name="progress"
                                value={formData.progress}
                                min="0"
                                max="100"
                                onChange={handleChange}
                            />
                            <label htmlFor="progress">Progress</label>

                            <label>Status</label>
                            <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            >
                                <option selected={formData.status === 'done'}  value='done'>Done</option>
                                <option selected={formData.status === 'working on it'}  value='working on it'>working on it</option>
                                <option selected={formData.status === 'stuck'}  value='stuck'>stuck</option>
                                <option selected={formData.status === 'not started'}  value='not started'>not started</option>
                            </select>

                            </>}

                            <input type="submit" />

                    </section>

                    <section>
                    <label htmlFor="owner">owner</label>
                        <input
                            id="owner"
                            name="owner"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.owner}
                        />

                        <label htmlFor="avatar">Avatar</label>
                        <input
                            id="avatar"
                            name="avatar"
                            type="url"
                            onChange={handleChange}
                            required={true}
                            value={formData.avatar}
                        />
                        <div className="img-preview">
                            {formData.avatar && (
                                <img src={formData.avatar} alt="image preview"/>
                            ) }
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default TicketPage;