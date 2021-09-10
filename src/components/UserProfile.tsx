import { gql, QueryLazyOptions } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { Exact, FetchUserQuery } from '../generated/graphql';

export const USER_PROFILE_FRAG = gql`
  fragment UserProfile__User on User {
    id
    userName
  }
`;

interface Props {
    data: FetchUserQuery | undefined,
    fetchUser: (options?: QueryLazyOptions<Exact<{
        id: string;
    }>> | undefined) => void
}

const UserProfile = ({ data, fetchUser }: Props) => {
    const [inputValue, onInputChange] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '' || parseInt(value) > 0) {
            onInputChange(value)
        }
    }

    const loadFetchUser = () => {
        fetchUser({ variables: { id: inputValue } })
    }

    const { user } = data ?? {};

    return <div>
        <h1>User</h1>
        <input type="text" name="name" placeholder="User ID" value={inputValue} onChange={handleChange} />
        <br />
        <button disabled={inputValue === ''} onClick={loadFetchUser}>Switch User</button>
        <br />
        <label>Current User: {user?.userName}</label>
    </div>
}

export default UserProfile;