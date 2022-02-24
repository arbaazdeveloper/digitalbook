//import { createContext } from "react";
import noteContext from "./noteContex";
import { useState } from "react";

const Notestate = (props) => {
var host='http://localhost:5000'
   const  notesInitial=[
        {
            "_id": "616cfbc28b8c84e3dc95cad2",
            "user": "616cab38c41c34791b5c8039",
            "title": "title my title updated",
            "description": "my description updated 999",
            "tag": "my tag",
            "date": "2021-10-18T04:44:50.759Z",
            "__v": 0
          },
          {
            "_id": "616db81b0d2842267a72773a",
            "user": "616cab38c41c34791b5c8039",
            "title": "the title",
            "description": "something new",
            "tag": "nothing",
            "date": "2021-10-18T18:08:27.766Z",
            "__v": 0
          },
          {
            "_id": "616db81e0d2842267a72773c",
            "user": "616cab38c41c34791b5c8039",
            "title": "the title",
            "description": "something new",
            "tag": "nothing",
            "date": "2021-10-18T18:08:30.669Z",
            "__v": 0
          },
          {
            "_id": "616dc24512ce9c5818354a09",
            "user": "616cab38c41c34791b5c8039",
            "title": "title my title",
            "description": "my description",
            "tag": "my tag",
            "date": "2021-10-18T18:51:49.510Z",
            "__v": 0
          }
    ]
    const [Notes, setNotes] = useState(notesInitial)

   const getNotes=async()=>{

    const url=`${host}/api/notes/fetchallnotes`
    const response = await fetch(url,{
      method: 'GET' ,
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
      
    });
    const json=await response.json()
       console.log(json)
       setNotes(json)
   } 

    const addNote= async (title,description,tag)=>{
      const url=`${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const note=await response.json();
      setNotes(Notes.concat(note))
      console.log('adding note')
    }


    const deleteNote=async(id)=>{

      const url=`${host}/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: 'DELETE' ,
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      });
      console.log(response)


     const newNotes=Notes.filter((Notes)=>{return Notes._id!==id})
      setNotes(newNotes)
      console.log("deleted id is"+id)
    //  alert('notes gote deleted')
    }

    const  editNote=async(id,title,description,tag)=>{
      //for serverside
      const url=`${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: 'PUT' ,
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
       
        body: JSON.stringify({title,description,tag}) 
      });
      // parses JSON response into native JavaScript objects
    
     console.log(response )

      //adding notes in client side
      let newNotes=JSON.parse(JSON.stringify(Notes))

      for (let index = 0; index <newNotes.length; index++) {

       // const element=newNotes[index]
       if(Notes._id===id){
        newNotes.title=title;
        newNotes.description=description;
        newNotes.tag=tag;
         break;
       }

        
      }
      console.log(newNotes +"the new notes ")
      setNotes(newNotes)
   //   const result= response.json();
      
    }


 
    return (
        <noteContext.Provider value={{Notes, addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default Notestate



