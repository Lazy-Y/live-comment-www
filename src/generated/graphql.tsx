import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: User;
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  userID: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  userName: Scalars['String'];
};

export type PageArgs = {
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['String']>;
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  edges?: Maybe<Array<PostEdge>>;
  nextAfterCursor?: Maybe<Scalars['String']>;
  nextBeforeCursor?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<Post>>;
  totalCount: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  post: Post;
  queryPosts: PaginatedPost;
  user: User;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryQueryPostsArgs = {
  pageArg: PageArgs;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  posts: Array<Post>;
  userName: Scalars['String'];
};

export type FetchUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, userName: string } };

export type PostComposer__UserFragment = { __typename?: 'User', id: number, userName: string };

export type CreatePostMutationVariables = Exact<{
  userID: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, content: string, user: { __typename?: 'User', userName: string } } };

export type PostItem__PostFragment = { __typename?: 'Post', id: number, content: string, user: { __typename?: 'User', userName: string } };

export type PostListQueryVariables = Exact<{
  data: PageArgs;
}>;


export type PostListQuery = { __typename?: 'Query', queryPosts: { __typename?: 'PaginatedPost', nextAfterCursor?: Maybe<string>, edges?: Maybe<Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, content: string, user: { __typename?: 'User', userName: string } } }>> } };

export type UserProfile__UserFragment = { __typename?: 'User', id: number, userName: string };

export const PostComposer__UserFragmentDoc = gql`
    fragment PostComposer__User on User {
  id
  userName
}
    `;
export const PostItem__PostFragmentDoc = gql`
    fragment PostItem__Post on Post {
  id
  user {
    userName
  }
  content
}
    `;
export const UserProfile__UserFragmentDoc = gql`
    fragment UserProfile__User on User {
  id
  userName
}
    `;
export const FetchUserDocument = gql`
    query fetchUser($id: ID!) {
  user(id: $id) {
    ...UserProfile__User
    ...PostComposer__User
  }
}
    ${UserProfile__UserFragmentDoc}
${PostComposer__UserFragmentDoc}`;

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($userID: ID!, $content: String!) {
  createPost(userID: $userID, content: $content) {
    ...PostItem__Post
  }
}
    ${PostItem__PostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const PostListDocument = gql`
    query PostList($data: PageArgs!) {
  queryPosts(pageArg: $data) {
    edges {
      node {
        ...PostItem__Post
      }
    }
    nextAfterCursor
  }
}
    ${PostItem__PostFragmentDoc}`;

/**
 * __usePostListQuery__
 *
 * To run a query within a React component, call `usePostListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostListQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePostListQuery(baseOptions: Apollo.QueryHookOptions<PostListQuery, PostListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostListQuery, PostListQueryVariables>(PostListDocument, options);
      }
export function usePostListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostListQuery, PostListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostListQuery, PostListQueryVariables>(PostListDocument, options);
        }
export type PostListQueryHookResult = ReturnType<typeof usePostListQuery>;
export type PostListLazyQueryHookResult = ReturnType<typeof usePostListLazyQuery>;
export type PostListQueryResult = Apollo.QueryResult<PostListQuery, PostListQueryVariables>;