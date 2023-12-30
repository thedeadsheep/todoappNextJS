'use client'

import { useEffect, useState } from "react"
let id = 0;
export default function Todolist() {
    const [doList, setDolist] = useState([])
    const [text, setText] = useState("")
    useEffect(() => {
        console.log("fx")
        getvalue()
    }, [])

    async function getvalue() {
        if (localStorage.getItem("todolist")) {
            setDolist(JSON.parse(localStorage.getItem("todolist")))
            id = parseInt(localStorage.getItem("id"))
        }

    }
    const wrapStyle = {
        height: "400px",
        width: "300px",
        borderRadius: "5px",
        border: "1px solid black",
        overflowY: "scroll"
    }
    function keyDownHandler(event) {
        if (event.keyCode === 13) {
            setDolist([...doList, {
                id: id,
                content: text
            }])
            setText("")
            id += 1
        }
        saveToLS("id", id)
        saveToLS("todolist", JSON.stringify(doList))
    }
    function saveToLS(key, value) {
        localStorage.setItem(key, value)
    }
    function textInputHandler(e) {
        console.log(text)
        setText(e.target.value)
    }
    function deleteHandler(key) {
        setDolist(doList.filter(todo => todo.id !== key))
    }
    return (
        <div>
            <h1 className="text-sm">
                This is to do list
            </h1>
            <div>
                <label className="text-input">
                    Nhập nội dung cần làm
                    <input
                        type="text"
                        value={text}
                        className=""
                        onChange={e => textInputHandler(e)}
                        onKeyDown={(event => keyDownHandler(event))} />
                </label>
                <div style={wrapStyle}>
                    {doList.length > 0 ? <>
                        {doList.map(todo => (
                            <div key={todo.id}>
                                <ItemNote todo={todo} deleteHandler={deleteHandler} />
                            </div>
                        ))}
                    </> : <div className="text-sm" style={{
                        padding: "5px"
                    }}>
                        Không có nội dung
                    </div>}
                </div>
            </div>
        </div>
    )
}

function ItemNote(props) {
    const {
        deleteHandler,
        todo
    } = props
    const flexCenter = {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            maxHeight: "75px",
            height: "75px",
            border: "1px solid",
            overflow: "hidden"
        }}>
            <div style={flexCenter} className="bg-gray wid-70">
                <p style={{
                    margin: "5px 0"
                }}>
                    id: {todo.id}
                </p>
                <p style={{
                    margin: "5px 0",
                }}>
                    content: {todo.content}
                </p>
            </div>

            <div
                className="bg-red text-white text-center wid-30"
                onClick={() => deleteHandler(todo.id)}
                style={flexCenter}>
                Delete
            </div>
        </div>
    )
}