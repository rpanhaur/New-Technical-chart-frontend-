import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ContentPageBody from "./ContentPageBody"
import ContentPageHead from "./ContentPageHead"
import axios from "axios"

const Home=()=>{
  const[roster,setRoster]=useState()

  const fetchRoster=async()=>{

    const response=await axios.get('http://localhost:3000/api/roster')
    console.log(response.data.rosters);
    setRoster(response.data.rosters)
  }
  useEffect(()=>{
    fetchRoster()
  },[])
  console.log(roster,'final data ');


  return(
    <>
    <Navbar/>
    <ContentPageHead/>


    {
      roster.map((rosterdata))
    }
  
    
    
    </>
  )
}
export default Home 