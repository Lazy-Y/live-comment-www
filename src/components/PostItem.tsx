import { gql } from "@apollo/client";
import { PostItem__PostFragment } from "../generated/graphql";

export const POST_ITEM_FRAG = gql`
  fragment PostItem__Post on Post {
    id
    user{
        userName
    }
    content
  }
`;

interface Props {
    post: PostItem__PostFragment
}

const PostItem = ({ post }: Props) => {
    const { id, user, content } = post;
    return <li key={id}>{user.userName}: {content}</li>
}

export default PostItem;