import {useState} from "react"

function CreateBookForm(props) {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [releaseYear, setReleaseYear] = useState();
    const [errorMessage, setErrorMessage] = useState();

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
        if(response.ok){
            console.log(`createBook: received response ${JSON.stringify(body)}`);
            props.addBook(body);
            console.log(`createBook: done!`);
        }
        else{
            console.log(`createBook: ERROR: ${response.status} - ${body.error} - ${body.message}`);
            setErrorMessage(body.message)
        }
        props.setIsLoading(false);
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <b>Add a new book to the list</b>
            <p>{errorMessage}</p>
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
