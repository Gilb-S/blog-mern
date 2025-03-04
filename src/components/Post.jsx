import React from 'react'

const Post = ({post, children}) => {
  return (
    <div className="post mb-6">
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='font-bold text-xl text-indigo-600 
            first-letter:uppercase hover:text-indigo-700
            transition-colors duration-300'>
            {post.title}
          </h2>
          <p className='text-xs text-slate-500 mt-1'>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {children}
        </div>
      </div>
      <p className='text-slate-600 mt-4 leading-relaxed'>{post.body}</p>
      <div className="h-px w-full bg-gradient-to-r 
        from-transparent via-indigo-200 to-transparent mt-6"/>
    </div>
  )
}

export default Post