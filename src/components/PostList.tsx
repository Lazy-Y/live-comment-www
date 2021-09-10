import { gql } from "@apollo/client";
import { useAllPostsQuery } from "../generated/graphql";
import PostItem from "./PostItem";

export const ALL_POSTS_QUERY = gql`
    query allPosts{
        allPosts{
            ...PostItem__Post
        }
    }
`;

const PostList = () => {
    const { loading, error, data } = useAllPostsQuery();
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return <>
        <h2>All Posts</h2>
        <>
            {
                data?.allPosts.map((post) => <PostItem post={post} />)
            }
        </>
    </>
}

export default PostList;