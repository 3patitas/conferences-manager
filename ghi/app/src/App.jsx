import Nav from './Nav'
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import './App.css'


function App(props) {
  return (
    <>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  )
}

export default App
