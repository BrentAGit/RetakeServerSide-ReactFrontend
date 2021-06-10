function EditBookForm(props) {

    async function editBook(book) {

        if (!props.currentSelected) return;
        console.log("async editBook");
        props.setIsLoading(true);

        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(book)
        };
        console.log(book);
        try{
            const response = await fetch(`http://localhost:8080/books/${book.id}`, fetchOptions);
            const body = await response.json();
            if(response.ok){
                console.log(`editBook: saving changes... ${JSON.stringify(body)}`);
                props.updateBook(body);
                console.log(`editBook: done!`);
            }
            else{
                console.log(`editBook: ERROR: ${response.status} - ${body.error} - ${body.message}`);
                props.setErrorMessage(body.message)
            }
        }
        catch(e){
            console.log(`deleteBook: ERROR: ${e}`);
            props.setErrorMessage("Connection Error")
        }
        props.setIsLoading(false);
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <b>Edit existing book</b>
            <div style={{paddingTop: "10px"}}>
                Title of the book: <br/>
                <input value={props.currentSelected.title} onChange={(e) => props.setCurrentSelected({...props.currentSelected, title: e.target.value})}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Author of the book: <br/>
                <input value={props.currentSelected.author} onChange={(e) => props.setCurrentSelected({...props.currentSelected, author: e.target.value})}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Release year of the book: <br/>
                <input value={props.currentSelected.releaseYear} onChange={(e) => props.setCurrentSelected({...props.currentSelected, releaseYear: e.target.value})}/>
            </div>
            <div style={{paddingTop: "10px"}}>
                <button onClick={() => {editBook(props.currentSelected) ; props.setIsEdit(!props.isEdit)}}>Save changes</button>
                <button onClick={() => {props.setCurrentSelected() ; props.setIsEdit(!props.isEdit)}}>Cancel edit</button>
            </div>
        </div>
    );
}

export default EditBookForm;
