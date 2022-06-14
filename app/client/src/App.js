import { Upload } from "./components/Upload";
import { Ner } from "./components/Ner";

function App() {
  return (
    <div className="container mt-4">
      <h4 className='display-4 text-center mb-4'>
        <i className="fab fa-react"/> NER App
      </h4>
      <Upload />
      <Ner />
    </div>
  );
}

export default App;
