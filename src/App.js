import {useState, useEffect} from "react"

import './App.css';
import CreateBookForm from "./components/CreateBookForm";
import EditBookForm from "./components/EditBookForm";
import DeleteBookButton from "./components/DeleteBookButton";

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    function addBook(book) {
        setBooks([...books, book]);
    }

    function updateBook(book) {
        setBooks(books.map((b) => b.id === book.id ? book : b));
    }

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
        {books.map((b) => <div key={b.id}>
            <p onClick={() => {setCurrentSelected({...b}) ; setIsEdit(!isEdit)}}>{b.id}. {b.title} - {b.author} [{b.releaseYear}]</p>
            <DeleteBookButton selectedBook={b}/>
        </div>)}
        {isLoading ? <p>Loading data...</p> : false}
        {isEdit ? <EditBookForm setIsLoading={setIsLoading} setIsEdit={setIsEdit} isEdit={isEdit} updateBook={updateBook} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected}/> : <CreateBookForm setIsLoading={setIsLoading} addBook={addBook}/>}
    </div>
  );
}

export default App;
