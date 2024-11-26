function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer"
            <p>${starts} - ${ends}</p>
        <div/>
    </div>
    `
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/'

    var alertHere = document.getElementById('alert')

    function alert(message) {
        console.log(message)
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-dark">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertHere.append(wrapper)
        }

    try {
        const response = await fetch(url)

        if (!response.ok) {
            alert('Failed to load conferences')

        } else {
            const data = await response.json() //happy path

            data.conferences.forEach(async (conference, index) => {
                const detailURL = `http://localhost:8000${conference.href}`
                const detailResponse = await fetch(detailURL)

                if (detailResponse.ok) {
                    const details = await detailResponse.json()
                    const title = details.conference.name
                    const description = details.conference.description
                    const pictureUrl = details.conference.location.picture_url
                    const starts = new Date(details.conference.starts).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
                    const ends = new Date(details.conference.ends).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
                    const location = details.conference.location.name
                    const html = createCard(title, description, pictureUrl, starts, ends, location)
                    const columns = document.querySelectorAll('.col-md-4')
                    columns[index % 3].innerHTML += html
                }
            })
        }

    } catch (e) {
        alert('Error')
        // Figure out what to do if an error is raised
    }

});
