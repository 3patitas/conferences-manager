window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/'

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()

        const selectTag = document.getElementById('state')
        for (let state of data.states) {
            const stateOption = document.createElement('option')
            stateOption.value = state.abbreviation
            stateOption.innerHTML = state.name
            selectTag.appendChild(stateOption)
        }
    } else {
        console.error('Failed to fetch states:', response.status)
    }

    const formTag = document.getElementById('create-location-form')
    formTag.addEventListener('submit', async event => {
        event.preventDefault()

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))

        const locationUrl = 'http://localhost:8000/api/locations/'
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(locationUrl, fetchConfig)
        if (response.ok) {
            formTag.reset()
            const newLocation = await response.json()
        }
    })
})
