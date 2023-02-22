import React from 'react'

const FormSubmit = ({handleCancelSubmit, handleChange, formValue:{book, url}, handleSubmit}) => {
  return (
    <>
        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-y-8 px-4' >
             <div className=' flex flex-col md:flex-row items-center justify-between w-full h-full gap-2 md:gap-4 duration-500 ease-in '>
                 <input 
                 className=' rounded-full text-base w-full md:w-auto shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-slate-900/40 outline-none border-slate-900 border-2 text-slate-200'
                  type="text"
                   placeholder='Bookmark Name'
                   name='book'
                   onChange={handleChange}
                   value={book} 
                   required/>
                 <input 
                 className=' rounded-full text-base w-full md:w-auto shadow-lg shadow-cyan-900 filter font-semibold  px-4 py-2 bg-transparent outline-none border-slate-900 border-2 text-slate-200' 
                 type="text" 
                 placeholder='Bookmark Url'
                 name='url'
                 onChange={handleChange}
                 value={url}
                 required/>
             </div>
             <div className=' grid grid-flow-col gap-2'>
             <button className='bg-slate-200/90 col-span-2 w-full py-2 rounded-2xl mx-auto text-base font-medium text-slate-900 active:scale-105 shadow-xl shadow-slate-900'>Submit</button>
             <button onClick={handleCancelSubmit} className=' bg-gradient-to-br from-cyan-400 to-red-600 w-full text-slate-200 py-2 rounded-2xl mx-auto text-base font-medium active:scale-105 shadow-xl shadow-slate-900'>Cancel</button>
             </div>
             
         </form>
    </>
  )
}

export default FormSubmit