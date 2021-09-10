import { gql } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { UserProfile__UserFragment } from '../generated/graphql';

export const USER_PROFILE_FRAG = gql`
  fragment UserProfile__User on User {
    id
    userName
  }
`;

interface Props {
    data: UserProfile__UserFragment | undefined,
    fetchUser: (id: string) => void
}

const UserProfile = ({ data, fetchUser }: Props) => {
    const [inputValue, onInputChange] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '' || parseInt(value) > 0) {
            onInputChange(value)
        }
    }

    return <div>
        <h1>User</h1>
        <input type="text" name="name" placeholder="User ID" value={inputValue} onChange={handleChange} />
        <br />
        <button disabled={inputValue === ''} onClick={() => fetchUser(inputValue)}>Switch User</button>
        <br />
        <label>Current User: {data?.userName}</label>
    </div>
}

export default UserProfile;