import React, { useEffect, useState } from 'react'

function LocationForm(props) {
    const [states, setStates] = useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()

            setStates(data.states)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [name, setName] = useState('')

    const [roomCount, setRoomCount] = useState('')

    const [city, setCity] = useState('')

    const [state, setState] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleRoomCountChange = (event) => {
        const value = event.target.value
        setRoomCount(value)
    }

    const handleSelectedState = (event) => {
        const value = event.target.value
        setState(value)
    }

    const handleCityChange = (event) => {
        const value = event.target.value
        setCity(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.room_count = roomCount
        data.name = name
        data.city = city
        data.state = state
        console.log(data)

        const locationURL = 'http://localhost:8000/api/locations/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const response = await fetch(locationURL, fetchConfig)
            if (response.ok) {
                const newLocation = await response.json()
                console.log(newLocation)

                setName('')
                setRoomCount('')
                setCity('')
                setState('')

            } else {
                console.error(`Error: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required value={name} type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleRoomCountChange} placeholder="Room count" required value={roomCount} type="number" name="room_count" id="room_count" className="form-control"/>
                            <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCityChange} placeholder="City" required value={city} type="text" name="city" id="city" className="form-control"/>
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleSelectedState} required value={state} name="state" id="state" className="form-select">
                                <option value="">Choose a state</option>
                                {states.map(state => {
                                    return (
                                        <option key={state.abbreviation} value={state.abbreviation}>
                                            {state.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LocationForm
