import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import TicketPage from "./pages/TicketPage";
import Nav from "./components/Nav";
import CategoriesContext from "./context/context";
import { useState } from "react";

function App() {
  const [categories , setCategories] = useState(null)
  const value = {categories , setCategories}
  return (
    <div className="app">
      <CategoriesContext.Provider value={value}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/tickets' element={<TicketPage />} />
          <Route path='/tickets/:id' element={<TicketPage editmode={true} />} />
        </Routes>
      </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
