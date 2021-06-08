import {useState, useEffect} from "react"

import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log("rendering App()...");

    useEffect(() => {
        console.log("Start of useEffect...");

        async function getBooks() {
            console.log("Start of async getBooks...");
            setIsLoading(true);
            const response = await fetch("http://localhost:8080/books");
            const body = await response.json();
            console.log("Received response in getBooks...");
            setBooks(body);
            setIsLoading(false);
            console.log("getBooks Done!");
        }

        getBooks();
        setIsLoading(false);
        console.log("useEffect: finished getBooks...");
        console.log("useEffect: Done!");
    }, []);

  return (
    <div className="App">
        {books.map((b) => <p key={b.id}>{b.id}. {b.title} - {b.author} [{b.releaseYear}]</p>)}
        {isLoading ? <p>Loading data...</p> : false}
    </div>
  );
}

export default App;
