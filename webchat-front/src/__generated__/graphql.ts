/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pseudo: Scalars['String']['output'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  user: UserMessage;
};

export type FriendResponse = {
  __typename?: 'FriendResponse';
  id: Scalars['ID']['output'];
  isOnline: Scalars['Boolean']['output'];
  pseudo: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: FriendResponse;
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  register: RegisterResponse;
  sendMessage: ChatMessage;
};


export type MutationAddFriendArgs = {
  pseudo: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationSendMessageArgs = {
  friendId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getMe: AuthUser;
  getMyFriends: Array<FriendResponse>;
  getRoomMessages: Array<ChatMessage>;
};


export type QueryGetRoomMessagesArgs = {
  friendId: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pseudo: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type Subscription = {
  __typename?: 'Subscription';
  userFriend: FriendResponse;
  userJoinedRoom: ChatMessage;
};


export type SubscriptionUserJoinedRoomArgs = {
  friendId: Scalars['String']['input'];
};

export type UserMessage = {
  __typename?: 'UserMessage';
  id: Scalars['String']['output'];
  pseudo: Scalars['String']['output'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'AuthUser', id: string, email: string, pseudo: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'AuthUser', id: string, email: string, pseudo: string } } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', token: string, user: { __typename?: 'AuthUser', id: string, email: string, pseudo: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetRoomMessagesQueryVariables = Exact<{
  friendId: Scalars['String']['input'];
}>;


export type GetRoomMessagesQuery = { __typename?: 'Query', getRoomMessages: Array<{ __typename?: 'ChatMessage', id: string, content: string, createdAt: any, user: { __typename?: 'UserMessage', id: string, pseudo: string } }> };

export type SendMessageMutationVariables = Exact<{
  friendId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'ChatMessage', id: string, content: string, createdAt: any, user: { __typename?: 'UserMessage', id: string, pseudo: string } } };

export type UserJoinedRoomSubscriptionVariables = Exact<{
  friendId: Scalars['String']['input'];
}>;


export type UserJoinedRoomSubscription = { __typename?: 'Subscription', userJoinedRoom: { __typename?: 'ChatMessage', id: string, content: string, createdAt: any, user: { __typename?: 'UserMessage', id: string, pseudo: string } } };

export type GetMyFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFriendsQuery = { __typename?: 'Query', getMyFriends: Array<{ __typename?: 'FriendResponse', id: string, pseudo: string, isOnline: boolean }> };

export type AddFriendMutationVariables = Exact<{
  pseudo: Scalars['String']['input'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'FriendResponse', id: string, pseudo: string, isOnline: boolean } };

export type UserFriendSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserFriendSubscription = { __typename?: 'Subscription', userFriend: { __typename?: 'FriendResponse', id: string, pseudo: string, isOnline: boolean } };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetRoomMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoomMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomMessagesQuery, GetRoomMessagesQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UserJoinedRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"userJoinedRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userJoinedRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]}}]}}]} as unknown as DocumentNode<UserJoinedRoomSubscription, UserJoinedRoomSubscriptionVariables>;
export const GetMyFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<GetMyFriendsQuery, GetMyFriendsQueryVariables>;
export const AddFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pseudo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<AddFriendMutation, AddFriendMutationVariables>;
export const UserFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"userFriend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFriend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<UserFriendSubscription, UserFriendSubscriptionVariables>;