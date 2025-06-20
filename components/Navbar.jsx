import { Link } from "react-router-dom"

const Navbar=()=>{
  return(
    <>

{/* Navbar */}
<nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center py-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600">
        Technical Chart
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
      <Link to="/login" className="hover:text-indigo-600 transition duration-200">Login</Link>
        <Link to="/" className="hover:text-indigo-600 transition duration-200">Home</Link>
        <Link to="/create-duty" className="hover:text-indigo-600 transition duration-200">Create Duty Schedule </Link>
        
        <a href="#" className="hover:text-indigo-600 transition duration-200">Edit Technical Chart</a>
        <Link to="/create-page" className="hover:text-indigo-600 transition duration-200">Create Technical Chart</Link>
      </div>
    </div>
  </div>
</nav>

    
    
    </>
  )
}

export default Navbar 