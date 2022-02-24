import React,{useContext,useState} from 'react'
import noteContext from '../notesContext/noteContex'

function Addnote() {
    const context = useContext(noteContext)
    const{addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"})

    const onchangeHandle=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
         
    }

     const onclickHandle=(e)=>{
         e.preventDefault();
         addNote(note.title,note.description,note.tag)
         setnote({title:"",description:"",tag:""})

     }
    

    return (
        <div>
             <div className="container addnote">
            <h1>Save Notes</h1>
                <form action="" method="post">
                    <input type="text" id="title" name="title" onChange={onchangeHandle} placeholder="enter your text here" value={note.title} minLength={5} required/>
                    <input type="text" id="description" name="description" value={note.description} onChange={onchangeHandle} placeholder="enter your text here"minLength={5} required />
                    <input type="text" id="tag" name="tag" value={note.tag} onChange={onchangeHandle} placeholder="enter your text here" />

                    <button disabled={note.title.length<5 || note.description.length<5} onClick={onclickHandle} type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
