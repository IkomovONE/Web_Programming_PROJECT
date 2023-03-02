import Post from "./Post"

const List = ({posts}) => {
    return (
        <div id="list">
            
            {posts.slice(0).reverse().map((post) => (
            <Post  key={post.id} post={post} />
            
            ))}
        </div>
    )
}

export default List
