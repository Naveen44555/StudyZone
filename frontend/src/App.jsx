// import AdminPanel from "./components/AdminPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UploadMaterial from "./components/UploadMaterial";
import MaterialList from "./components/MaterialList";
import ViewMaterial from "./components/ViewMaterial";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
   const user = { role: "admin" }; // TEMP
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
       {user?.role === "admin" && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}

        <Route path="/material/:id" element={<ViewMaterial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

