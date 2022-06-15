import { Upload } from "./components/Upload";
import { Ner } from "./components/Ner";
import { FilesContextProvider } from "./ctx/files-context";

function App() {
  return (
    
    <div className="container mt-4">
      <h4 className='display-4 text-center mb-4'>
        <i className="fab fa-react"/> Named Entity Extraction Application
      </h4>
      <FilesContextProvider>
        <Upload />
        <Ner />
      </FilesContextProvider>
      
    </div>
  );
}

export default App;
