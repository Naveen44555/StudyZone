import MaterialList from "./components/MaterialList";
// import TestUpload from "./components/TestUpload";
import UploadMaterial from "./components/UploadMaterial";

function App() {
  return (
    
    <div>
        <div style={{ padding: "20px" }}>
          <h1>📚 StudyZone</h1>
         
           <UploadMaterial />
            <hr />
             <MaterialList />
        </div>
        


    </div>
  );
}

export default App;
