import gql from "graphql-tag";
import { ChangeEvent, useState } from "react";
import { PostComposer__UserFragment } from "../generated/graphql";

export const USER_PROFILE_FRAG = gql`
  fragment PostComposer__User on User {
    id
    userName
  }
`;

interface Props {
    user: PostComposer__UserFragment | undefined,
}

const PostComposer = ({ user }: Props) => {
    const [inputValue, onInputChange] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        onInputChange(value)
    }
    return <>
        <h2>Write Post</h2>
        <textarea placeholder="Write Your Post" value={inputValue} onChange={handleChange} />
        <br />
        <button disabled={inputValue === ''} onClick={() => { }}>Submit</button>
    </>
}

export default PostComposer;