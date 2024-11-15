import React from "react";
import './App.css';
import NavBar from './components/NavBar.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        console.log(data.message);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
