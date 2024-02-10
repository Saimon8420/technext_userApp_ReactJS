import { Route, Routes } from "react-router-dom"
import DisplayUser from "./components/AllUser/DisplayUser";
import NotFound from "./components/NotFound/NotFound";
import EachUser from "./components/EachUser/EachUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DisplayUser />}></Route>

        <Route path="/home" element={<DisplayUser />}></Route>

        <Route path="/user/:userId" element={<EachUser />}></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
    </div>
  )
}

export default App
