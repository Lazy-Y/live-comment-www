import { gql } from '@apollo/client';
import { useAllPostsQuery } from '../generated/graphql';

export const ALL_POSTS_QUERY = gql`
    query allPosts{
        allPosts{
            user{
                userName
            }
            content
        }
    }
`;


const PostContainer = () => {
    const { loading, error, data } = useAllPostsQuery();
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return <><h1>Posts</h1><>{
        data?.allPosts.map(({ content, user }) => <li>{user.userName}: {content}</li>)
    }
    </></>
}

export default PostContainer;