import './App.css'
import {useEffect, useMemo, useRef, useState} from 'react'
import {type User} from './types'
import {UserList }from "./components/UserList"



function App() {
  const [users,setUsers] = useState<User[]>([])
  const [showColors,setShowColors] = useState(false)
  const [sortByCountry,setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry,setFilterCountry] = useState<string|null>(null)

const toggleColors = () => {
  setShowColors(!showColors)
}
const toggleSortByCountry = () => {setSortByCountry(prevState => !prevState)}

const handelDelete = (email:string) => {
  const filteredUsers = users.filter(user => user.email !== email)
  setUsers(filteredUsers)
}

const handleReset = () => {
  setUsers(originalUsers.current)
  
}




  useEffect(() => {
 fetch('https://randomuser.me/api/?results=100')
  .then(res => res.json())
  .then(res => {
    setUsers(res.results)
    originalUsers.current = res.results
  
  }) 
  .catch(err => console.error(err))
},[])

const filteredUsers = useMemo(()=> {
  return filterCountry !=null 
? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
: users
},[users,filterCountry]) 

const sortedUsers = useMemo(()=>{
  return sortByCountry
 ?filteredUsers.toSorted((a,b) => {
  return a.location.country.localeCompare(b.location.country)
}) : filteredUsers
},[filteredUsers,sortByCountry]) 






  return (
    <div className="App">
      <h1>Random List Users</h1>
      <header>
            <button onClick={toggleColors}>Colorear Filas</button> 
            <button onClick={toggleSortByCountry}>{sortByCountry?"No ordenar por pais":"Ordenar por pais"}</button>
            <button onClick={handleReset}>Resetear usuarios eliminados</button> 
            <input type="text" placeholder="Buscar por país" onChange={e => setFilterCountry(e.target.value)}/>" 
      </header>
      <main>
        <UserList deleteUser={handelDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </div>
  )
}

export default App
