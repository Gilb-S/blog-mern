import React, { useContext, useEffect, useState } from 'react'
import { getPosts } from '../../controllers/Post.controller'
import {PostContext} from '../../context/PostContext'
import Post from '../../components/Post'
const Home = () => {

    // the the post using stetehook
    const {posts, setPosts} = useContext(PostContext)


    // loading state animation :D 
    const [loading ,setLoading] = useState(true);


    // useeEffect to fireup hooks
    useEffect(() => {
        setTimeout( async () => {
            // get all the post 
            const data = await getPosts()
            setPosts(data.posts)
            // remove the loading animation
            setLoading(false);
        }, 1500)
    }, [])

    console.log(posts)
  return (
    <section className='card'>
        <h1 className="title">Latest posts</h1>
        {loading && (
           <i className="fa-solid fa-spinner animate-spin text-5xl text-indigo-400 text-center block"/>
        )}
        {posts && posts.map((post) => <div key={post._id}>
            <Post post={post}/>
        </div>)}
    </section>
  )
}

export default Home