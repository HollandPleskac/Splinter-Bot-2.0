import React from 'react'

const dashboard = () => {
  return (
    <div className='flex w-screen h-screen' >
      <Sidebar />
      <div className='flex flex-col w-full' >
        <Topbar />
        <PageContent />
      </div>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className='bg-blue-700 px-5' style={{ width: '300px' }} >
      <div className='h-topbar flex items-center'>
        <img src="logo-white.png" alt="Logo" width='42' />
        <h1 className='text-blue-50 text-xl ml-2' >Splinter Bot</h1>
      </div>
      <hr />
      <NavLink
        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>}
        name='Home'
      />
      <hr className='border-blue-50 mt-3' />
      <NavLink
        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>}
        name='Home'
      />
      <NavLink
        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>}
        name='Home'
      />
      <NavLink
        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>}
        name='Home'
      />
      <NavLink
        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>}
        name='Home'
      />
    </div>
  )
}

const NavLink = (props) => {
  return (
    <div className='flex pt-4' >
      {props.svg}
      <h3 className='text-blue-50 ml-3 text-md' >{props.name}</h3>
    </div>
  )
}


const Topbar = () => {
  return (
    <div className='w-full h-topbar z-10 shadow'>
      test
    </div>
  )
}

const PageContent = () => {
  return (
    <div className='flex items-center justify-around h-dashContent bg-gray-50 ' >
      <p>button</p>
      <p>list of buttons</p>
    </div>
  )
}


export default dashboard
