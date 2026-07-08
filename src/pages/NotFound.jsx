import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {

  useEffect(() => {
    document.title = "TaskFlow | Page Not Found"
  }, []);
  
  return (
    <section className='flex min-h-[70vh] items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-bold text-slate-800'>
          404
        </h1>

        <h2 className='mb-2 text-2xl font-semibold text-slate-700'>
          Page Not Found
        </h2>

        <p className='mb-8 text-slate-500'>
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to={'/'}
          className='rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700'
        >
          Back Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound