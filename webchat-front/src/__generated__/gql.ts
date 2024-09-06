/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetMe {\n    getMe {\n      id\n      email\n      pseudo  \n    }\n  }\n": types.GetMeDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($data: RegisterInput!) {\n    register(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query GetRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n": types.GetRoomMessagesDocument,
    "\n  mutation SendMessage($friendId: String!, $message: String!) {\n    sendMessage(friendId: $friendId, message: $message) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n": types.SendMessageDocument,
    "\n  subscription userJoinedRoom($friendId: String!) {\n    userJoinedRoom(friendId: $friendId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n": types.UserJoinedRoomDocument,
    "\n  query GetMyFriends {\n    getMyFriends {\n      id\n      pseudo\n      isOnline\n    }\n  }\n": types.GetMyFriendsDocument,
    "\n  mutation AddFriend($pseudo: String!) {\n    addFriend(pseudo: $pseudo) {\n      id\n      pseudo\n      isOnline\n    }\n  }\n": types.AddFriendDocument,
    "\n  subscription userFriend {\n    userFriend {\n      id\n      pseudo\n      isOnline\n    }\n  }\n": types.UserFriendDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    getMe {\n      id\n      email\n      pseudo  \n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    getMe {\n      id\n      email\n      pseudo  \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($data: RegisterInput!) {\n    register(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($data: RegisterInput!) {\n    register(data: $data) {\n      token\n      user {\n        id\n        email\n        pseudo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage($friendId: String!, $message: String!) {\n    sendMessage(friendId: $friendId, message: $message) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($friendId: String!, $message: String!) {\n    sendMessage(friendId: $friendId, message: $message) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription userJoinedRoom($friendId: String!) {\n    userJoinedRoom(friendId: $friendId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription userJoinedRoom($friendId: String!) {\n    userJoinedRoom(friendId: $friendId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        pseudo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMyFriends {\n    getMyFriends {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  query GetMyFriends {\n    getMyFriends {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddFriend($pseudo: String!) {\n    addFriend(pseudo: $pseudo) {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  mutation AddFriend($pseudo: String!) {\n    addFriend(pseudo: $pseudo) {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription userFriend {\n    userFriend {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription userFriend {\n    userFriend {\n      id\n      pseudo\n      isOnline\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;