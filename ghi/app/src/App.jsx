import Nav from './Nav'

function App(props) {
  const navLinks = ["Home", "Link 1", "Contact Us", "Resources"]


  return (
    <>
      <Nav navLinks={navLinks}/>
      <div className="container">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
            </tr>
          </thead>
          <tbody>
          {props.attendees.map(attendee => {
            return (
              <tr key={attendee.href}>
                <td>{ attendee.name }</td>
                <td>{ attendee.conference }</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
