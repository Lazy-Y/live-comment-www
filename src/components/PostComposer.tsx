import gql from "graphql-tag";
import { ChangeEvent, useState } from "react";
import { PostComposer__UserFragment, useCreatePostMutation } from "../generated/graphql";
import { POST_ITEM_FRAG } from "./PostItem";

export const USER_PROFILE_FRAG = gql`
  fragment PostComposer__User on User {
    id
    userName
  }
`;

interface Props {
    user: PostComposer__UserFragment,
}

export const CREATE_POST = gql`
    mutation createPost($userID:ID!, $content: String!){
        createPost(userID:$userID, content:$content){
            ...PostItem__Post
        }
    }
`

const PostComposer = ({ user }: Props) => {
    const [inputValue, onInputChange] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        onInputChange(value)
    }

    const [createPost, { loading }] = useCreatePostMutation({
        update(cache, { data }) {
            cache.modify({
                fields: {
                    allPosts(existingPosts = []) {
                        if (data == null) {
                            return existingPosts;
                        }
                        const newPostRef = cache.writeFragment({
                            data: data.createPost,
                            fragment: POST_ITEM_FRAG
                        });
                        return [...existingPosts, newPostRef];
                    }
                }
            })
        }
    })

    return <>
        <h2>Write Post</h2>
        <textarea placeholder="Write Your Post" value={inputValue} onChange={handleChange} />
        <br />
        <button disabled={loading} onClick={() => createPost({
            variables: {
                userID: String(user.id),
                content: inputValue
            }
        })}>Submit</button>
    </>
}

export default PostComposer;