import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from './utilities/users-service';
import NavBar from './components/NavBar';
import Table from './components/Table';

export default function App() {
  const [user, setUser] = React.useState(getUser());
  const [data, setData] = React.useState([])
  const [hide, setHide] = React.useState()
  const [checked, setChecked] = React.useState(false)

  function handleHide (evt) {
    setHide(evt.target.value)
  }
  function handleChange(evt) {
    setChecked(!checked)
  }
  React.useEffect(() => {
    async function getFcs() {
      const res = await fetch('http://ncaaschedules.herokuapp.com/fcs')
      const data = await res.json()
      setData(data)
    }
    getFcs()
  }, [])

  return (
    <main onClick={handleHide}>
      {user ?
        <>
          <NavBar hide={hide} handleChange={handleChange} checked={checked} user={user} setUser={setUser} setData={setData} />
          <Table  handleChange={handleChange} checked={checked} data={data} />
        </>
        :
        <>
          <NavBar handleChange={handleChange} checked={checked} user={user} setUser={setUser} />
          <Table  handleChange={handleChange} checked={checked} data={data} />
        </>
      }
    </main>
  );
}



