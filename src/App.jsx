import React from 'react';
import { getUser } from './utilities/users-service';
import NavBar from './components/NavBar';
import Table from './components/Table';
import axios from 'axios'
const fetchAuth = {
  method: "get",
  headers: {
    'Accept': 'application/json',
  }
}

export default function App() {
  const [user, setUser] = React.useState(getUser());
  const [data, setData] = React.useState([])
  const [hide, setHide] = React.useState()
  const [checked, setChecked] = React.useState(false)
  const [schools, setSchools] = React.useState([])
 



  function handleHide(evt) {
    setHide(evt.target.value)
    return evt.target.value
  }
  function handleChange(evt) {
    setChecked(!checked)
  }

  React.useEffect(() => {
    async function getFootballSchedules() {
      const res = await axios.get('https://ncaaschedulesapi.herokuapp.com/', fetchAuth)
      let data = res.data
      setData(data)
      let schoolArray = new Set()
      for (let i = 0; i < res.data.length; i++) {
        schoolArray.add(res.data[i].schoolName)
        schoolArray.add(res.data[i].compEventName)
      }
      setSchools([...schoolArray])
    }
    getFootballSchedules()
  }, [])

  return (
    <main onClick={handleHide} style={{backgroundColor: checked ? 'rgb(57, 62, 70)' : 'rgb(247, 247, 247)', width: '100%', height:'100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>
      {user ?
        <>
          <NavBar   hide={hide} handleChange={handleChange} checked={checked} user={user} setUser={setUser} setData={setData} schools={schools}/>
          <Table handleChange={handleChange} checked={checked} data={data} />
        </>
        :
        <>
          <NavBar  handleChange={handleChange} checked={checked} user={user} setUser={setUser} schools={schools}/>
          <Table handleChange={handleChange} checked={checked} data={data} />
        </>
      }
    </main>
  );
}




