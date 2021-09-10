import { PostComposer__UserFragment } from '../generated/graphql';
import PostComposer from './PostComposer';
import PostList from './PostList';

interface Props {
    user: PostComposer__UserFragment | undefined,
}

const PostContainer = ({ user }: Props) => {
    return <>
        <h1>Posts</h1>
        <PostComposer user={user} />
        <br />
        <PostList />
    </>
}

export default PostContainer;