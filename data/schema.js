const typeDefinitions = `
type User {
  id: ID!
  qqId: String
  weiboId: String
  facebookId: String
  twitterId: String
  githubId: String
  avatar: String
  firstName: String
  lastName: String
  nickname: String
  timezone: Int
  publisher: Boolean
  createdAt: String
  updatedAt: String
  posts: [Post]
}
type Post {
  id: ID!
  title: String
  url: String
  content: String
  views: Int
  createdAt: String
  updatedAt: String
  comments: [Comment]
  user: User
}
type Comment {
  id: ID!
  content: String
  locked: Boolean
  createdAt: String
  updatedAt: String
  post: Post
}
type Query {
  user(firstName: String, lastName: String): User
  getUSDA: String
}
type Mutation {
  addUser(nickname: String!): User
}
schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];
