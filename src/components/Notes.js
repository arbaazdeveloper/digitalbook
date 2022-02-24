import React, { useContext, useEffect, useRef,  useState } from 'react'
import noteContext from '../notesContext/noteContex'
import Addnote from './Addnote';
import Noteitems from './Noteitems';
import { useHistory } from 'react-router-dom'
function Notes() {
    const context = useContext(noteContext)
    const { Notes, getNotes,editNote} = context;
    const [note, setnote] = useState({ id:"",etitle:"",edescription:"",etag:"default"})
    let history=useHistory();

    const onchangeHandle=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
         
    }

     const onclickHandle=(e)=>{
      closeref.current.click();
      editNote(note.id, note.etitle, note.edescription,note.etag)
     }

     useEffect(() => {
       if(localStorage.getItem('token')){
         getNotes();

       }
       else{
         history.push('/login')
       }
       // eslint-disable-next-line 
    }, [])

    
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id, etitle:currentNote.title ,edescription:currentNote.edescription ,etag:currentNote.tag})
    }
    const ref = useRef(null)
    const closeref = useRef(null)
    return (
        <>
            <Addnote />
           
           
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <input type="text" id="etitle" name="etitle" value={note.etitle} onChange={onchangeHandle} placeholder="enter your text here" />
         <input type="text" id="edescription" value={note.edescription} name="edescription"  onChange={onchangeHandle} placeholder="enter your text here" />
        <input type="text" id="etag" name="etag" value={note.etag}  onChange={onchangeHandle} placeholder="enter your text here" />
      </div>

      <div className="modal-footer">
        <button  ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={onclickHandle} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


            <div className="container">
                <div className="row">
                    <h1>Your Notes</h1>
                    {Notes.length===0&&"no post yet"}
                    {Notes.map((note) => {
                        return <Noteitems key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>

            </div>
        </>
    )
}

export default Notes
