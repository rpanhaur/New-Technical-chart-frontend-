import { Link } from "react-router-dom"

const TechNav=()=>{
  return(
    <>

{/* Navbar */}
<nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-end items-center py-4">
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-sky-700 font-bold">
       
        <Link to="/create-duty" className="hover:text-indigo-600 transition duration-200">Create Shift Duty </Link>
        
       
      </div>
    </div>
  </div>
</nav>

    
    
    </>
  )
}

export default TechNav