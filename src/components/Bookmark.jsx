import React from 'react'

const Bookmark = ({item,  formValue, isEditing, updateBookmark, handleCancelUpdate, deleteBookmark}) => {
    const {id,book, url} =item
   
 
  return (
    <>
        <div  className='w-full h-auto grid md:grid-cols-5 mx-auto px-8 py-3 gap-3'>
            <div className='flex items-center border-none rounded-xl col-span-2 md:col-span- justify-center px-20 py-1 shadow-xl hover:shadow-slate-200 bg-slate-900/20 '>
                <p className='text-base md:text-lg font-bold text-slate-200 '>{book}</p>
            </div>
            <a href={url} target='_blank' rel='noopener noreferrer' className='flex shadow-xl hover:shadow-slate-200  items-center justify-center bg-green-500 border rounded-2xl px-4 py-0.5'>
                <button className='text-sm md:text-base font-bold text-slate-200 ' >Visit</button>
            </a>
            
            {formValue.id === id && isEditing ? (<div onClick={handleCancelUpdate} className='flex shadow-xl justify-center hover:shadow-slate-200 items-center bg-gradient-to-br from-green-500 to-red-600 border rounded-2xl px-4 py-0.5'>
            <button className='text-sm md:text-base font-bold py-1 text-slate-200 '>Cancel</button> 
         </div>):
            <div onClick={()=>updateBookmark(id, book, url)}  className='flex shadow-xl justify-center hover:shadow-slate-200 items-center bg-orange-500  border rounded-2xl px-4 py-0.5'>
               <button className='text-sm md:text-base font-bold text-slate-200 py-1'>Update</button> 
            </div>}
            <div onClick={()=>deleteBookmark(id)} className='flex shadow-xl col-span-2 md:col-span-1 justify-center hover:shadow-slate-200 items-center bg-red-500 border rounded-2xl px-4 py-0.5'>
                <button className='text-sm md:text-base font-bold text-slate-200 py-1 '>Delete</button>
            </div>
           </div>
    </>
  )
}

export default Bookmark