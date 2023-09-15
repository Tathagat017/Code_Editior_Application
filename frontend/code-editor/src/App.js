import logo from "./logo.svg";
import "./App.css";
import Main2 from "./Components/CodeEditor2";
import Main from "./Components/CodeEditor";
import Nav from "./Components/Navbar";
import SmallWithLogoLeft from "./Components/Footer";
function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <Nav />
      <Main2 />
      <SmallWithLogoLeft />
    </div>
  );
}

export default App;
