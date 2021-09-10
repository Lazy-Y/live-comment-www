import { gql } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { useFetchUserLazyQuery } from '../generated/graphql';

export const FETCH_USER_QUERY = gql`
  query fetchUser($id:ID!){
    user(id:$id){
      id
      userName
    }
  }
`;


const UserProfile = () => {
    const [loadFetchUser, { loading, error, data }] = useFetchUserLazyQuery();
    const [inputValue, onInputChange] = useState<string>('')

    console.log(loading, data, error);


    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '' || parseInt(value) > 0) {
            onInputChange(value)
        }
    }

    const fetchUser = () => {
        console.log('load fetch user');
        loadFetchUser({ variables: { id: inputValue } })
        console.log('load fetch user end');
    }

    return <div>
        <h1>User</h1>
        <input type="text" name="name" placeholder="User ID" value={inputValue} onChange={handleChange} />
        <br />
        <button disabled={inputValue === ''} onClick={fetchUser}>Switch User</button>
        <br />
        <label>Current User: {data?.user?.userName}</label>
    </div>
}

export default UserProfile;