import PostLink from "./PostLink"


//importing necessary component

const List = ({posts}) => {

    //list component
    return (
        <div id="list">
            
            {posts.slice(0).reverse().map((post) => (
            <PostLink  key={post.id} post={post} />
            
            ))}
        </div>
    )
}

//returning a list with postLink components as elements of posts array

export default List
