import React,{useContext} from 'react'
import noteContext from '../notesContext/noteContex'
import Moment from 'moment'


function Noteitems(props) {
  const context = useContext(noteContext)
  const{deleteNote}=context;

    const {note,updateNote}=props
    return (
        <div className="col-md-3">
            <div className="card">
 
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
    <p className="card-text">{Moment(note.date).format(`On DD-MM-YYYY`)}</p>
    <i className="far fa-edit mx-3" onClick={()=>{updateNote(note)}}></i>
    <i className="fas fa-trash-alt" onClick={()=>deleteNote(note._id)}></i>

  </div>
</div>
            
        </div>
    )
}

export default Noteitems
