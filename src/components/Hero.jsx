import React, { useEffect, useReducer, useState } from 'react'
const ACTIONS ={ 
    ADD_BOOKMARK: 'addToBookmark',
    DELETE_BOOKMARK: 'deleteBookmark',
    UPDATE_BOOKMARK: 'updateBookmark',
    CANCEL_BOOKMARK: 'cancelBookmark'
    
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
        case ACTIONS.CANCEL_BOOKMARK:{
            return bookmark
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
    const handleCancel = () =>{
       setFormValue({book:'', url: ''})
    }
    useEffect(() =>{
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }, [bookmark])
    const elementBookmark = bookmark.map((item, index)=>{
        const {id,book, url} =item
        // console.log(book)
        return(
            <div key={index} className='w-full h-auto grid md:grid-cols-5 mx-auto px-8 py-3 gap-3'>
            <div className='flex items-center border-none rounded-xl col-span-2 md:col-span- justify-center px-20 py-1 shadow-xl hover:shadow-slate-200 bg-slate-900/20 '>
                <p className='text-base md:text-lg font-bold text-slate-200 '>{book}</p>
            </div>
            <div className='flex shadow-xl hover:shadow-slate-200  items-center justify-center bg-green-500 border rounded-2xl px-4 py-0.5'>
                <a href={url} className='text-sm md:text-base font-bold text-slate-200 ' target='_blank' rel='noopener noreferrer'>Visit</a>
            </div>
            <div  className='flex shadow-xl justify-center hover:shadow-slate-200 items-center bg-orange-500 border rounded-2xl px-4 py-0.5'>
               {isEditing? <button onClick={handleCancel} className='text-sm md:text-base font-bold text-slate-200 '>Cancel</button> : <button onClick={()=>updateBookmark(id, book, url)} className='text-sm md:text-base font-bold text-slate-200 '>Update</button> } 
            </div>
            <div onClick={()=>deleteBookmark(id)} className='flex shadow-xl col-span-2 md:col-span-1 justify-center hover:shadow-slate-200 items-center bg-red-500 border rounded-2xl px-4 py-0.5'>
                <button className='text-sm md:text-base font-bold text-slate-200 '>Delete</button>
            </div>
           </div>
        )
    })
  return (
    <div className='w-full h-screen relative'>
        <img className='w-full h-full object-fill' src="https://cdn.pixabay.com/photo/2018/10/19/10/43/social-media-3758364__340.jpg" alt="" />
        <div className='absolute top-0 left-0 w-full h-screen bg-slate-900/70 opacity-100 z-10'/>
        <div className='absolute opacity-100 z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-y-6 bg-slate-200/30 w-full h-[80vh] max-w-[1140px] m-auto'>
            <h1 className='text-center text-cyan-200 italic md:text-start w-full px-4'>All you bookmarks in one place</h1>
            <div className='flex flex-col items-center my-2  w-full h-auto max-w-[500px] mx-auto'>
                {isEditing ?( <form onSubmit={handleUpdate} className='flex flex-col w-full gap-y-8 px-4' >
                <div className=' flex flex-col md:flex-row items-center justify-between w-full h-full gap-2 md:gap-4 '>
                    <input 
                    className=' rounded-full text-base w-full md:w-auto shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-slate-900/40 outline-none border-slate-900 border-2 text-slate-200'
                     type="text"
                      placeholder='Bookmark Name'
                      name='book'
                      onChange={handleChange}
                      value={formValue.book} 
                      required/>
                    <input 
                    className=' rounded-full w-full md:w-auto text-base shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-transparent outline-none border-slate-900 border-2 text-slate-200' 
                    type="text" 
                    placeholder='Bookmark Url'
                    name='url'
                    onChange={handleChange}
                    value={formValue.url}
                    required/>
                </div>
                <button className='bg-slate-200/90 w-full py-2 rounded-2xl mx-auto text-base font-medium text-slate-900 active:scale-105 shadow-xl shadow-slate-900'>Update</button>
            </form>) :
             ( <form onSubmit={handleSubmit} className='flex flex-col w-full gap-y-8 px-4' >
             <div className=' flex flex-col md:flex-row items-center justify-between w-full h-full gap-2 md:gap-4 duration-500 ease-in '>
                 <input 
                 className=' rounded-full text-base w-full md:w-auto shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-slate-900/40 outline-none border-slate-900 border-2 text-slate-200'
                  type="text"
                   placeholder='Bookmark Name'
                   name='book'
                   onChange={handleChange}
                   value={formValue.book} 
                   required/>
                 <input 
                 className=' rounded-full text-base w-full md:w-auto shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-transparent outline-none border-slate-900 border-2 text-slate-200' 
                 type="text" 
                 placeholder='Bookmark Url'
                 name='url'
                 onChange={handleChange}
                 value={formValue.url}
                 required/>
             </div>
             <div className=' grid grid-flow-col gap-2'>
             <button className='bg-slate-200/90 col-span-2 w-full py-2 rounded-2xl mx-auto text-base font-medium text-slate-900 active:scale-105 shadow-xl shadow-slate-900'>Submit</button>
             <button onClick={handleCancel} className=' bg-gradient-to-br from-cyan-400 to-red-600 w-full py-2 rounded-2xl mx-auto text-base font-medium text-slate-900 active:scale-105 shadow-xl shadow-slate-900'>Cancel</button>
             </div>
             
         </form>)}
           
            </div>
            <div className='h-[45vh] w-full  overflow-y-auto '>
            {elementBookmark}
            </div>
            
          
        </div>
    </div>
  )
}

export default Hero