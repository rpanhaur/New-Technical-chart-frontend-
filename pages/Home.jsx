


import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ContentPageHead from "../components/ContentPageHead";
import ContentPageBody from "../components/ContentPageBody";


const Home = () => {

  const[roster,setRoster]=useState([])

  const fetchRoster=async()=>{

    const response=await axios.get('http://localhost:3000/api/roster')
    console.log(response.data.rosters);
    setRoster(response.data.rosters)
  }

  useEffect(()=>{
    fetchRoster()
  },[])
  console.log(roster,'final data ');

    

    return (
        <>
            <Navbar/>
            <ContentPageHead/>
            

            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-2 py-3 text-sm font-semibold text-left">SN</th>
                            <th className="px-2 py-3 text-sm font-semibold text-left">PROGRAMS DETAILS</th>
                            <th className="px-2 py-3 text-sm font-semibold text-left">IN TIME</th>
                            <th className="px-2 py-3 text-sm font-semibold text-left">OUT TIME</th>
                            <th className="px-2 py-3 text-sm font-semibold text-left">DURATION</th>
                            <th className="px-2 py-3 text-sm font-semibold text-left">REMARKS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {roster.map((p) => (
                            <ContentPageBody key={p.id} schedule={p} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;