function EditBookForm(props) {

    if (!props.currentSelected){
        return null;
    }

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
        const response = await fetch(`http://localhost:8080/books/${book.id}`, fetchOptions);
        const body = await response.json();
        props.updateBook(body);
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
                <button onClick={() => editBook(props.currentSelected)}>Save changes</button>
                <button onClick={() => {props.setCurrentSelected();props.setIsEdit(!props.isEdit)}}>Cancel edit</button>
            </div>
        </div>
    );
}

export default EditBookForm;
