import { gql } from "@apollo/client";
import { usePostListQuery } from "../generated/graphql";
import PostItem from "./PostItem";

export const POST_LIST = gql`
    query PostList($data: PageArgs!){
        queryPosts(pageArg:$data){
            edges{
                node{
                    ...PostItem__Post
                }
            }
            nextAfterCursor
        }
    }
`;

const PostList = () => {
    const { loading, error, data, fetchMore } = usePostListQuery({
        variables: {
            data: {

            }
        }
    });
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    const { nextAfterCursor } = data?.queryPosts ?? {};
    console.log('nextAfterCursor', nextAfterCursor, nextAfterCursor == null);

    return <>
        <h2>All Posts</h2>
        <>
            {
                data?.queryPosts?.edges?.map(({ node }) => <PostItem post={node} />)
            }
        </>
        <button disabled={nextAfterCursor == null} onClick={() => {
            fetchMore({
                variables: {
                    data: {
                        afterCursor: nextAfterCursor
                    }
                }
            });
        }}>Load More</button>
    </>
}

export default PostList;