import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const persons = [
  {
    "id": 1,
    "name": "John Doe",
    "description": "Software Engineer",
    "interests": ["Coding", "Gaming", "Reading"],
    "socials": [
      {"id": 1, "url": "https://www.linkedin.com/in/johndoe", "name": "LinkedIn"},
      {"id": 2, "url": "https://twitter.com/johndoe", "name": "Twitter"}
    ]
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "description": "Data Scientist",
    "interests": ["Machine Learning", "Statistics", "Traveling"],
    "socials": [
      {"id": 3, "url": "https://github.com/janesmith", "name": "GitHub"},
      {"id": 4, "url": "https://www.researchgate.net/profile/Jane_Smith", "name": "ResearchGate"}
    ]
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "description": "UX Designer",
    "interests": ["Design Thinking", "User Experience", "Photography"],
    "socials": [
      {"id": 5, "url": "https://dribbble.com/alicejohnson", "name": "Dribbble"},
      {"id": 6, "url": "https://www.behance.net/alicejohnson", "name": "Behance"}
    ]
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "description": "Product Manager",
    "interests": ["Project Management", "Product Development", "Tech Startups"],
    "socials": [
      {"id": 7, "url": "https://www.producthunt.com/@bobbrown", "name": "Product Hunt"},
      {"id": 8, "url": "https://www.crunchbase.com/organization/bob-browns-startup", "name": "Crunchbase"}
    ]
  },
  {
    "id": 5,
    "name": "Charlie White",
    "description": "Full Stack Developer",
    "interests": ["Web Development", "JavaScript", "Open Source"],
    "socials": [
      {"id": 9, "url": "https://stackoverflow.com/users/1234567/charliewhite", "name": "Stack Overflow"},
      {"id": 10, "url": "https://github.com/charliewhite", "name": "GitHub"}
    ]
  }
]

function App() {
  return (
    <>
      {persons.map((person) => <Card key={person.id} person={person}/>)}
    </>
  )
}

function Card({person}) {
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
    maxWidth: '400px',
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
