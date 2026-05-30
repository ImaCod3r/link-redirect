import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OpenLink from "./pages/OpenLink";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={ <OpenLink /> } />
        <Route path="*" element={<NotFound /> } />
      </Routes>
    </Router>
  )
}

export default App;