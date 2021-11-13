import React, { useState, useEffect } from "react";


function Todo() {


    // get local storage data

    const getLocalData = () => {
        const Lists = localStorage.getItem("mytodolist")
        if (Lists) {
            return JSON.parse(Lists)
        }
        else {
            return []
        }
    }


    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())

    const [isEditItem, setisEditItem] = useState("")
    const [togglebutton, setToggleButton] = useState(false)

    // add items

    const addItem = () => {
        if (!inputData) {
            alert("please add item")
        }
        // else if (inputData && togglebutton) {
        //     setItems(items.map((curElem) => {
        //         if (curElem.id === isEditItem) {
        //             return { ...curElem, name: inputData }
        //         }
        //         else{
        //             return curElem
        //         }
                
        //     })
        //     )
        // }
        else {
            const mynewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, mynewInputData])
            setInputData("")
        }
    }

    // delete items

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updatedItems)
    }

    // remove all elements

    const removeAll = () => {
        setItems([])
    }

    // adding local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])


    // edit items

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })
        {
            setItems(items.map((curElem) => {
                if (curElem.id === isEditItem) {
                    return { ...curElem, name: inputData }
                }
                else{
                    return curElem
                }
                
            })
            )
        }
        setInputData(item_todo_edited.name)

        setisEditItem(index)
        setToggleButton(true)
    }





    return (
        <div>
            <h1>ToDo List</h1>
            <input type="text" value={inputData} onChange={(event) => setInputData(event.target.value)} /><br /><br />

            

            <button onClick={addItem}>Add</button>&nbsp;
            <div>
                <br />
                {items.map((curElem) => {
                    return (
                        <div key={curElem.id}>
                            <br />
                            <input type="text" value={curElem.name} /><br /><br />
                            <button onClick={() => editItem(curElem.id)}>Edit</button>&nbsp;
                            <button onClick={() => deleteItem(curElem.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <br />
            <button onClick={removeAll}>Remove All</button>


        </div>
    )
}

export default Todo