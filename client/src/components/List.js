import Post from "./Post"

const List = ({posts}) => {
    return (
        <div id="list">
            
            {posts.map((post) => (
            <Post  key={post.id} item={post} />
            ))}
        </div>
    )
}

export default List
