import Navbar from "./components/Navbar"
import Mainroutes from "./routes/Mainroutes"

const App = () => {
  return (
    <div className="bg-gray-800 font-thin h-screen w-screen py-10 px-[10%] text-white">
      
      <Navbar />
      <Mainroutes />
      
    </div>
  )
}

export default App