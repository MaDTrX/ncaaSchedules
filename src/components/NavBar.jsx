
import * as React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import * as userService from '../utilities/users-service';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"


const fcsConferences = ['Ohio Valley Conference', 'Northeast Conference', 'Southern Conference', 'Pioneer Football League', 'Big South Conference', 'Southwestern Athletic Conf.', 'Colonial Athletic Association', 'ASUN Conference', 'Big Sky Conference', 'Patriot League', 'Southland Conference', 'Independent', 'The Ivy League']
const fbsConferences = ['Conference USA', 'Sun Belt Conference', 'American Athletic Conference', 'Pac-12 Conference', 'Mid-American Conference', 'Mountain West Conference', 'Big 12 Conference', 'Big Ten Conference', 'Independent', 'Atlantic Coast Conference']

const fetchAuth = {
  method: "GET",
  headers : { 
    'Accept': 'application/json',
   }
  }

export default function NavBar({ user, hide, setUser, setData, checked, handleChange}) {
  const [accordion, setAccordion] = React.useState([])
  const [credentials, setCredentials] = React.useState(null)
  const [subDivision, setSubDivision] = React.useState('')
  const [navState, setNavState] = React.useState(false)
  const accordionNav = accordion.map(el => <Grid item xs={12} md={12} lg={6}><Button onClick={handleNav} value={el} fullWidth={true}>{el}</Button></Grid>)

  React.useEffect(() => {
    if (!hide) setNavState(false)
  }, [hide])

  function handleCred(evt) {
    if (evt.target.value === 'signUp') {
      setCredentials(<SignUpForm setUser={setUser} />)
    } else if (evt.target.value === 'logIn') {
      setCredentials(<LoginForm setUser={setUser} />)
    }
  }

  function handleStyle() {
    if (checked === true) {
      return 'black'
    }
    else {
      return 'white'
    }
  }

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  async function handleNav(evt) {
    const allConf = fcsConferences.concat(fbsConferences)
    allConf.forEach(async (conf) => {
      if (evt.target.value === conf) {
        // console.log(evt.target.value)
        const res = await fetch('https://ncaaschedules.herokuapp.com/' + subDivision + '/' + evt.target.value, fetchAuth)
        const data = await res.json()
        // setNavState(true)
        setAccordion(data)
      }
      if (!allConf.includes(evt.target.value)) {
        setNavState(false)
        const res = await fetch('https://ncaaschedules.herokuapp.com/comp/' + evt.target.value, fetchAuth)
        const data = await res.json()
        setData(data)
      }
    })
  }

  function handleAccordion(evt) {
    if (evt.target.value === 'fbs') {
      setNavState(true)
      setAccordion(fbsConferences)
      setSubDivision(evt.target.value)

    } else if (evt.target.value === 'fcs') {
      setNavState(true)
      setAccordion(fcsConferences)
      setSubDivision(evt.target.value)

    } else if (evt.target.value === 'logIn' || evt.target.value === 'signUp') {
      setNavState(true)
    }
  }
  return (
    <Accordion sx={{background: handleStyle}} expanded={navState} onClick={handleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {user ?
          <>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={handleAccordion} variant="text" value="fbs">FBS</Button>
            <Button onClick={handleAccordion} variant="text" value="fcs">FCS</Button>
            <Button onClick={handleAccordion} variant="text" value="account">ACCOUNT</Button>
            <Button onClick={handleLogOut} variant="text" value="account">LOGOUT</Button>
          </>
          :
          <>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={handleCred} variant="text" value="signUp">SIGN UP</Button>
            <Button onClick={handleCred} variant="text" value="logIn">LOG IN</Button>

          </>
        }
      </AccordionSummary>
      <Accordion sx={{background: handleStyle}}>
        <AccordionDetails>
          <ButtonGroup fullWidth={true} variant="contained" aria-label="outlined primary button group">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              alignItems="center"
            >
              {user ?
                <>
                  {accordionNav}
                </>
                :
                <>
                  {credentials}
                </>
              }
            </Grid>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </Accordion>

  );
};