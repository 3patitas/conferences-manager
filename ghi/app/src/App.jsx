import Nav from './Nav'
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import './App.css'


function App(props) {
  const navLinks = ["Home", "New Location", "New Conference"]


  return (
    <>
      <Nav navLinks={navLinks}/>
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  )
}

export default App
