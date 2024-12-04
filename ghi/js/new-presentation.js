window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()

        const selectTag = document.getElementById('conference')
        for (let conference of data.conferences) {
            const conferenceOption = document.createElement('option')
            conferenceOption.value = conference.id
            conferenceOption.innerHTML = conference.name
            selectTag.appendChild(conferenceOption)
        }
    } else {
        console.error('Failed to load conferences:', response.status)
    }

    const formTag = document.getElementById('create-presentation-form')
    formTag.addEventListener('submit', async event => {
        event.preventDefault()

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        const formObject = Object.fromEntries(formData)
        console.log(formObject)
        const presentationURL = `http://localhost:8000/api/conferences/${formObject.conference}/presentations/`
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(presentationURL, fetchConfig)
        if (response.ok) {
            formTag.reset()
            const newPresentation = await response.json()
        }

    })

})
