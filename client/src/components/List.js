import PostLink from "./PostLink"

const List = ({posts}) => {
    return (
        <div id="list">
            
            {posts.slice(0).reverse().map((post) => (
            <PostLink  key={post.id} post={post} />
            
            ))}
        </div>
    )
}

export default List
