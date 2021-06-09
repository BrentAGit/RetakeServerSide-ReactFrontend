import {useState} from "react"

function CreateBookForm(props) {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [releaseYear, setReleaseYear] = useState();

    async function createBook(book){
        console.log("createBook");
        props.setIsLoading(true);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)
        };
        const response = await fetch ("http://localhost:8080/books", fetchOptions);
        const body = await response.json();
        props.addBook(body);
        props.setIsLoading(false);
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <b>Add a new book to the list</b>
            <div style={{paddingTop: "10px"}}>
                Title of the book: <br/>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Author of the book: <br/>
                <input value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Release year of the book: <br/>
                <input value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)}/>
            </div>
            <div style={{paddingTop: "10px"}}>
                <button onClick={() => createBook({'title': title, 'author': author, 'releaseYear': releaseYear})}>Create book!</button>
            </div>
        </div>
    );
}

export default CreateBookForm;
