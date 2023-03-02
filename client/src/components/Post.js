


const Post = ({post}) => {

    return (


        <div id="post">
            
            <div id= "author">
                <a id="created">Created by: {post.author}</a>

                <a id= "when">When: {post.date}</a>
                <p></p>
            </div>

            <div id= "subject">
                <p>Subject:{post.subject}</p>
            </div>

            <div id= "description">
                <p>Description:{post.description}</p>
            </div>

            <div id= "code">
                <p>Code:{post.code}</p>
            </div>

                
                
        </div>

        
        
            


        

        

        

        

        
    )
}

export default Post
