import { gql } from "@apollo/client";
import { useFetchUserLazyQuery } from "../generated/graphql";
import PostContainer from "./PostContainer"
import UserProfile from "./UserProfile"

export const FETCH_USER_QUERY = gql`
  query fetchUser($id:ID!){
    user(id:$id){
      ...UserProfile__User
      ...PostComposer__User
    }
  }
`;

const AppContainer = () => {
    const [fetchUser, { loading, error, data }] = useFetchUserLazyQuery();

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    const loadFetchUser = (id: string) => {
        fetchUser({ variables: { id } })
    }

    return <>
        <UserProfile data={data?.user} fetchUser={loadFetchUser} />
        <PostContainer user={data?.user} />
    </>
}

export default AppContainer;