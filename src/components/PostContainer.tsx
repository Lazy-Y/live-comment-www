import { gql } from '@apollo/client';
import { useAllPostsQuery } from '../generated/graphql';

export const ALL_POSTS_QUERY = gql`
    query allPosts{
        allPosts{
            id
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
        data?.allPosts.map(({ id, content, user }) => <li key={id}>{user.userName}: {content}</li>)
    }
    </></>
}

export default PostContainer;