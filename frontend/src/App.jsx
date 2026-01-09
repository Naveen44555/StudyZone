// import AdminPanel from "./components/AdminPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UploadMaterial from "./components/UploadMaterial";
import MaterialList from "./components/MaterialList";
import ViewMaterial from "./components/ViewMaterial";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <UploadMaterial />
              <MaterialList />
            </>
          }
        />

        <Route path="/material/:id" element={<ViewMaterial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

