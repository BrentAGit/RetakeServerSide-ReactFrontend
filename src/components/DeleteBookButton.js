import React from "react"

function DeleteBookButton(props) {

    async function deleteBook(book) {
        console.log("async deleteBook");

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)
        };
        await fetch (`http://localhost:8080/books/${book.id}`, fetchOptions);
        window.location.reload(false);
    }

    return (
        <div>
            <button onClick={deleteBook(props.thisBook)}>Remove book</button>
        </div>
    );
}

export default DeleteBookButton;
