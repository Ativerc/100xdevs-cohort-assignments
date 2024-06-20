import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import jsonData from './data/persons.json'

function App() {
  const [persons, setPersons] = useState(jsonData);
  const [adminMode, setAdminMode] = useState(false);
  console.log(persons)

  function handleDelete(id) {
    const deleteCandidate = persons.filter(person => person.id == id)[0]
    if (window.confirm(`Delete user: ${deleteCandidate.name} ?`))
      console.log()
      setPersons( persons.filter(person => person.id !== id));
  }
  return (
    <div>
      <div></div>
      <AddNewPerson persons={persons} setNewPerson={setPersons}/>
      <hr></hr>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1>Team</h1>
        <div><button onClick={() => setAdminMode(!adminMode)}>{adminMode ? "Save" : "Edit Team"}</button></div>
      </div>
      <div className="card-container">{persons.map((person) => <Card adminMode={adminMode} key={person.id} person={person} handleDelete={handleDelete}/>)}</div>
    </div>
  )
}

function Card({person, adminMode, handleDelete}) {
  return (
    <div style={styles.card}>
      <div style={styles.name}>{person.name}</div>
      <div style={styles.description}>{person.description}</div>
      <div style={styles.interestsHeader}>Interests</div>
      <div style={styles.interestsList}>
        {person.interests.map((interest, index) => <div key={index} style={styles.interestItem}>{interest}</div>)}
      </div>
      <div style={styles.socialLinks}>
        {person.socials.map((socialItem, index) => <a key={index} href={socialItem.url} target='_blank' rel="noopener noreferrer" style={styles.link}>{socialItem.name}</a> )}
      </div>
      {adminMode ? <button onClick={() => handleDelete(person.id)}>Delete User</button> : ""}
    </div>
)
}

function AddNewPerson({persons, setNewPerson}) {

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Add New Person handleSubmit Reached")
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    console.log([formJson.socialName])
    const newPersonObject = {
      id: persons.length + 1,
      name: formJson.name,
      description: formJson.description,
      interests: [formJson.interests],
      socials: [{"url": formJson.socialUrl, "name": formJson.socialName}]
    }

    setNewPerson([...persons, newPersonObject])
  }
  return (
    <div id="new-person-form">
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <h2>Add to Team</h2>
        </div>
      <form method='post' onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full Name</label>
        <input type="text" name="name" id="full-name" />
        <br />
        <label htmlFor="role">Role</label>
        <input type="text" name="description" id="role" />
        <br />
        <label htmlFor="interests">Interests</label>
        <input type="text" name="interests" id="interests" />
        <br />
        <label htmlFor="social">Website Link</label>
        <input type="text" name="socialName" id="social" placeholder='Social Website Name'/>
        <input type="text" name="socialUrl" id="social-url" placeholder='Social Website URL'/>
        <br />
        <button type='reset'>Reset</button>
        <button type='submit'>Add to Team</button>
      </form>
    </div>
  )
}

// Styles
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa'
  },
  name: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  socialLinks: {
    display: 'flex',
    marginBottom: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff', // Text color
    padding: '10px 15px', // Padding for the button
    borderRadius: '5px', // Border radius for rounded corners
    backgroundColor: '#007BFF', // Background color for the button
    display: 'inline-block', // Display as inline-block to be side by side
    margin: '', // Margin between buttons
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
  },
  interestsHeader: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  interestsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  interestItem: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#555',
  },
};

export default App
