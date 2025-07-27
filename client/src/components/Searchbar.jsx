import React from 'react'
import { Search } from 'lucide-react'
const Searchbar = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='w-full relative z-10'>
      <span className='absolute top-[.75rem] left-2'><Search strokeWidth={1.5}/></span>
      <input type="text" className='input-base w-full' placeholder='search...' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}  />
    </div>
  )
}

export default Searchbar
