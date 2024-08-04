import React from 'react'

export default function AddPhoto() {
  return (
    <div className='sticky top-11'>
    <span className='inline-block h-52 w-52 overflow-hidden rounded-full bg-gray-100'>
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
    <button className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 block p-1 px-3 rounded-full bg-white shadow-custom">
      <span className="flex items-center gap-2">
        <span className="l1rd791t atm_gz_idpfg4 atm_h0_ftgil2 dir dir-ltr">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="block h-4 w-4 fill-current">
            <path d="M17.59 2a2.01 2.01 0 0 1 1.41.59L21.41 5H25a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h3.62L13 2.6a2.01 2.01 0 0 1 1.42-.6zM16 8.5a8.51 8.51 0 0 0 0 17 8.51 8.51 0 0 0 0-17zm0 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm-10-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
        </span>
        <span className="c1fl7a92 dir dir-ltr">Add</span>
      </span>
    </button>
  </div>  )
}
