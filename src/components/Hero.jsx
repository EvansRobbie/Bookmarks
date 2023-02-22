import React, { useEffect, useReducer, useState } from 'react'
import Bookmark from './Bookmark'
import FormSubmit from './FormSubmit'
import FormUpdate from './FormUpdate'
import { CursorArrowRippleIcon } from '@heroicons/react/24/solid'
export const ACTIONS ={ 
    ADD_BOOKMARK: 'addToBookmark',
    DELETE_BOOKMARK: 'deleteBookmark',
    UPDATE_BOOKMARK: 'updateBookmark',
    
}
const bookmarkReducer = (bookmark, action) => {
    switch (action.type){
        case ACTIONS.ADD_BOOKMARK:{
            // const marked = [...bookmark, newBookmark(action.payload)]
            // const newBooked = action.payload
            // check if the bookmarked items are same. Use .find or .some but would prefer
            // .find sinche it reurns the actual condition that were looking for rather than .some
            // which returns a boolean if atleast one condition is met. But works well with both
           const isBookmarked = bookmark.find((bm)=> bm.book === action.payload.book || bm.url === action.payload.url)
            // if item already bookmarked trigger an alert
          if (isBookmarked){
                alert('Bookmark with the same name or url already.')
                return bookmark // return  same state if boomark already exists
           }
       
        //    if item is not bookmarked then it should be added to the state
           else{
            return [...bookmark, newBookmark(action.payload)]
           }
          
        }
        case ACTIONS.DELETE_BOOKMARK:{
            // console.log(...bookmark)
            // .the method returns all the items in the array that id donot match with the action.payload.id as true
            // and the id that matches the action payload as false hence removing it fro state
            return bookmark.filter((bm)=>bm.id !== action.payload.id)
        }
        case ACTIONS.UPDATE_BOOKMARK:{
            // find the index  of the bookmark in the bookmarks array that matches the id of the updated bookmark
            const update = bookmark.findIndex((bm)=> bm.id === action.payload.id)
            if (update === -1) return bookmark // bookmark not found
            const updateBookmark = {...bookmark[update], book:action.payload.book, url:action.payload.url}
            // Do'nt use the splice method as it returns a new array replacing all the bookmarks. uncomment to get a better understanding
            // return [
            //     ...bookmark.splice(0, update), updateBookmark, ...bookmark.splice(update + 1)
            // ]
        //     // the newBookmarkState spreads all the bookmarks in the array
            const newBookmarkState = [...bookmark]
        //     // // newBookmarkState[update] selects the bookmark at the index and asigns it to the updateBookmark hence  displaying
        //     // // the new array to the user
            newBookmarkState[update] = updateBookmark
        //     // // returning the newBookmarkState displays the previous bookmarks and the updated bookmark
            return newBookmarkState
        }
        default:
            return bookmark
    }
}
const newBookmark = (formValue) =>{
    return {id: Date.now(), book:formValue.book, url:formValue.url }
}
const Hero = () => {
const [formValue, setFormValue] = useState({book: '', url: ''})
    const [isEditing, setIsEditing] = useState(false)
    const [bookmark, dispatch] = useReducer(bookmarkReducer, JSON.parse(localStorage.getItem('bookmark')) || [])
   
    const handleChange = (e) =>{
      const {name, value} = e.target
        setFormValue({...formValue, [name]: value})
    }
    // console.log(formValue)
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch({type: ACTIONS.ADD_BOOKMARK, payload:formValue})
        setFormValue({book:'', url: ''})
    }
    const deleteBookmark = (id)=>{
        dispatch({type:ACTIONS.DELETE_BOOKMARK, payload:{id: id}})
    }
    const updateBookmark = (id, book, url) =>{
        dispatch({type:ACTIONS.UPDATE_BOOKMARK, payload:{id: id, book: book, url:url}})
        setFormValue({id: id, book:book, url:url})
        setIsEditing(true)
    }
    const handleUpdate = (e) =>{
        e.preventDefault()
        dispatch({type:ACTIONS.UPDATE_BOOKMARK, payload:formValue})
        setIsEditing(false)
        setFormValue({book:'', url: ''})
    }
    const handleCancelUpdate= () =>{
        setIsEditing(!isEditing)
        setFormValue({book:'', url: ''})
    }
    const handleCancelSubmit = () =>{
       setFormValue({book:'', url: ''})
    }
    useEffect(() =>{
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }, [bookmark])
    const elementBookmark = bookmark.map((item)=>
   
        // console.log(book)
        <Bookmark key= {item.id} 
        item = {item} 
        formValue={formValue}
        dispatch={dispatch} 
        isEditing={isEditing} 
        updateBookmark ={updateBookmark} 
        handleCancelUpdate={handleCancelUpdate}
        deleteBookmark={deleteBookmark}
        />
    )
  return (
    <div className='w-full h-screen relative'>
        <img className='w-full h-full object-fill' src="https://cdn.pixabay.com/photo/2018/10/19/10/43/social-media-3758364__340.jpg" alt="" />
        <div className='absolute top-0 left-0 w-full h-screen bg-slate-900/70 opacity-100 z-10'/>
        <div className='absolute opacity-100 z-20 top-[50%] left-[50%] translate-x-[-50%]  shadow-2xl shadow-slate-900 translate-y-[-50%] flex flex-col items-center gap-y-6 bg-slate-200/30 w-full h-[80vh] max-w-[1140px] m-auto rounded-3xl'>
           <div className='flex items-center  w-full px-4 pt-6'>
           <CursorArrowRippleIcon className='h-10 w-10 md:h-14 md:w-14 text-slate-200 mr-4'/>
            <h1 className='text-center text-cyan-200 italic lg:text-start w-full  border-b-2 border-slate-200'>All your bookmarks in one place.</h1>
           </div>
            <div className='flex flex-col items-center my-2  w-full h-auto max-w-[500px] mx-auto'>
                {isEditing ? <FormUpdate
                formValue = {formValue}
                handleChange = {handleChange} 
                handleUpdate = {handleUpdate}
                handleCancelUpdate = {handleCancelUpdate}
                /> :
             <FormSubmit 
             formValue = {formValue}
              handleChange = {handleChange} 
              handleSubmit = {handleSubmit}
              handleCancelSubmit = {handleCancelSubmit}
               />}
           
            </div>
            <div className='h-[45vh] w-full  overflow-y-auto '>
            {elementBookmark}
            </div>
            
          
        </div>
    </div>
  )
}

export default Hero