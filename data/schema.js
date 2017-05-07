const typeDefinitions = `
# A forum comment written by a user.
type Comment implements Node {
  # A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  nodeId: ID!

  # The primary key for the comment.
  id: Int!

  # The id of the post of the user.
  postId: Int!
  userId: Int!

  # The id of the comment the user replied to.
  commentId: Int!

  # The main content of our comment on the post.
  content: String!

  # A comment wil be locked after others reply to it.
  locked: Boolean!

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime

  # Reads a single Post that is related to this Comment.
  postByPostId: Post

  # Reads a single User that is related to this Comment.
  userByUserId: User

  # Reads a single Comment that is related to this Comment.
  commentByCommentId: Comment

  # Reads and enables paginatation through a set of Comment.
  commentsByCommentId(
    # The method to use when ordering Comment.
    orderBy: CommentsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: CommentCondition
  ): CommentsConnection
}

# A condition to be used against Comment object types. All fields are tested for equality and combined with a logical ‘and.’
input CommentCondition {
  # Checks for equality with the object’s id field.
  id: Int

  # Checks for equality with the object’s postId field.
  postId: Int

  # Checks for equality with the object’s userId field.
  userId: Int

  # Checks for equality with the object’s commentId field.
  commentId: Int

  # Checks for equality with the object’s content field.
  content: String

  # Checks for equality with the object’s locked field.
  locked: Boolean

  # Checks for equality with the object’s createdAt field.
  createdAt: Datetime

  # Checks for equality with the object’s updatedAt field.
  updatedAt: Datetime
}

# A forum comment written by a user.
input CommentInput {
  # The primary key for the comment.
  id: Int

  # The id of the post of the user.
  postId: Int!
  userId: Int!

  # The id of the comment the user replied to.
  commentId: Int!

  # The main content of our comment on the post.
  content: String!

  # A comment wil be locked after others reply to it.
  locked: Boolean!

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime
}

# Represents an update to a Comment. Fields that are set will be updated.
input CommentPatch {
  # The primary key for the comment.
  id: Int

  # The id of the post of the user.
  postId: Int
  userId: Int

  # The id of the comment the user replied to.
  commentId: Int

  # The main content of our comment on the post.
  content: String

  # A comment wil be locked after others reply to it.
  locked: Boolean

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime
}

# A connection to a list of Comment values.
type CommentsConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # The count of *all* Comment you could get from the connection.
  totalCount: Int

  # A list of edges which contains the Comment and cursor to aid in pagination.
  edges: [CommentsEdge]

  # A list of Comment objects.
  nodes: [Comment!]
}

# A Comment edge in the connection.
type CommentsEdge {
  # A cursor for use in pagination.
  cursor: Cursor

  # The Comment at the end of the edge.
  node: Comment!
}

# Methods to use when ordering Comment.
enum CommentsOrderBy {
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  NATURAL
  ID_ASC
  ID_DESC
  POST_ID_ASC
  POST_ID_DESC
  USER_ID_ASC
  USER_ID_DESC
  COMMENT_ID_ASC
  COMMENT_ID_DESC
  CONTENT_ASC
  CONTENT_DESC
  LOCKED_ASC
  LOCKED_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

# All input for the createComment mutation.
input CreateCommentInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The Comment to be created by this mutation.
  comment: CommentInput!
}

# The output of our createComment mutation.
type CreateCommentPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String

  # The Comment that was created by this mutation.
  comment: Comment

  # An edge for our Comment. May be used by Relay 1.
  commentEdge(
    # The method to use when ordering Comment.
    orderBy: CommentsOrderBy = PRIMARY_KEY_ASC
  ): CommentsEdge

  # Reads a single Post that is related to this Comment.
  postByPostId: Post

  # Reads a single User that is related to this Comment.
  userByUserId: User

  # Reads a single Comment that is related to this Comment.
  commentByCommentId: Comment

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the createPost mutation.
input CreatePostInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The Post to be created by this mutation.
  post: PostInput!
}

# The output of our createPost mutation.
type CreatePostPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String

  # The Post that was created by this mutation.
  post: Post

  # An edge for our Post. May be used by Relay 1.
  postEdge(
    # The method to use when ordering Post.
    orderBy: PostsOrderBy = PRIMARY_KEY_ASC
  ): PostsEdge

  # Reads a single User that is related to this Post.
  userByUserId: User

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the createUser mutation.
input CreateUserInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The User to be created by this mutation.
  user: UserInput!
}

# The output of our createUser mutation.
type CreateUserPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String

  # The User that was created by this mutation.
  user: User

  # An edge for our User. May be used by Relay 1.
  userEdge(
    # The method to use when ordering User.
    orderBy: UsersOrderBy = PRIMARY_KEY_ASC
  ): UsersEdge

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# A location in a connection that can be used for resuming pagination.
scalar Cursor

# A point in time as described by the [ISO
# 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
scalar Datetime

# All input for the deleteCommentById mutation.
input DeleteCommentByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary key for the comment.
  id: Int!
}

# All input for the deleteComment mutation.
input DeleteCommentInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single Comment to be deleted.
  nodeId: ID!
}

# The output of our deleteComment mutation.
type DeleteCommentPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  comment: Comment
  deletedCommentId: ID

  # Reads a single Post that is related to this Comment.
  postByPostId: Post

  # Reads a single User that is related to this Comment.
  userByUserId: User

  # Reads a single Comment that is related to this Comment.
  commentByCommentId: Comment

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the deletePostById mutation.
input DeletePostByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary key for the post.
  id: Int!
}

# All input for the deletePost mutation.
input DeletePostInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single Post to be deleted.
  nodeId: ID!
}

# The output of our deletePost mutation.
type DeletePostPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  post: Post
  deletedPostId: ID

  # Reads a single User that is related to this Post.
  userByUserId: User

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the deleteUserById mutation.
input DeleteUserByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary unique identifier for the user.
  id: Int!
}

# All input for the deleteUser mutation.
input DeleteUserInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single User to be deleted.
  nodeId: ID!
}

# The output of our deleteUser mutation.
type DeleteUserPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  user: User
  deletedUserId: ID

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# The root mutation type which contains root level fields which mutate data.
type Mutation {
  # Creates a single Comment.
  createComment(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: CreateCommentInput!
  ): CreateCommentPayload

  # Updates a single Comment using its globally unique id and a patch.
  updateComment(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdateCommentInput!
  ): UpdateCommentPayload

  # Updates a single Comment using a unique key and a patch.
  updateCommentById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdateCommentByIdInput!
  ): UpdateCommentPayload

  # Deletes a single Comment using its globally unique id.
  deleteComment(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeleteCommentInput!
  ): DeleteCommentPayload

  # Deletes a single Comment using a unique key.
  deleteCommentById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeleteCommentByIdInput!
  ): DeleteCommentPayload

  # Creates a single Post.
  createPost(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: CreatePostInput!
  ): CreatePostPayload

  # Updates a single Post using its globally unique id and a patch.
  updatePost(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdatePostInput!
  ): UpdatePostPayload

  # Updates a single Post using a unique key and a patch.
  updatePostById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdatePostByIdInput!
  ): UpdatePostPayload

  # Deletes a single Post using its globally unique id.
  deletePost(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeletePostInput!
  ): DeletePostPayload

  # Deletes a single Post using a unique key.
  deletePostById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeletePostByIdInput!
  ): DeletePostPayload

  # Creates a single User.
  createUser(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: CreateUserInput!
  ): CreateUserPayload

  # Updates a single User using its globally unique id and a patch.
  updateUser(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdateUserInput!
  ): UpdateUserPayload

  # Updates a single User using a unique key and a patch.
  updateUserById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: UpdateUserByIdInput!
  ): UpdateUserPayload

  # Deletes a single User using its globally unique id.
  deleteUser(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeleteUserInput!
  ): DeleteUserPayload

  # Deletes a single User using a unique key.
  deleteUserById(
    # The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    input: DeleteUserByIdInput!
  ): DeleteUserPayload
}

# An object with a globally unique ID.
interface Node {
  # A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  nodeId: ID!
}

# Information about pagination in a connection.
type PageInfo {
  # When paginating forwards, are there more items?
  hasNextPage: Boolean!

  # When paginating backwards, are there more items?
  hasPreviousPage: Boolean!

  # When paginating backwards, the cursor to continue.
  startCursor: Cursor

  # When paginating forwards, the cursor to continue.
  endCursor: Cursor
}

# A forum post written by a user.
type Post implements Node {
  # A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  nodeId: ID!

  # The primary key for the post.
  id: Int!

  # The id of the author user.
  userId: Int!

  # The title written by the user.
  title: String!

  # The url of the post.
  url: String

  # The main content text of our post.
  content: String

  # Number of times the post has been visited.
  visit: Int

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime

  # Reads a single User that is related to this Post.
  userByUserId: User

  # Reads and enables paginatation through a set of Comment.
  commentsByPostId(
    # The method to use when ordering Comment.
    orderBy: CommentsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: CommentCondition
  ): CommentsConnection
}

# A condition to be used against Post object types. All fields are tested for equality and combined with a logical ‘and.’
input PostCondition {
  # Checks for equality with the object’s id field.
  id: Int

  # Checks for equality with the object’s userId field.
  userId: Int

  # Checks for equality with the object’s title field.
  title: String

  # Checks for equality with the object’s url field.
  url: String

  # Checks for equality with the object’s content field.
  content: String

  # Checks for equality with the object’s visit field.
  visit: Int

  # Checks for equality with the object’s createdAt field.
  createdAt: Datetime

  # Checks for equality with the object’s updatedAt field.
  updatedAt: Datetime
}

# A forum post written by a user.
input PostInput {
  # The primary key for the post.
  id: Int

  # The id of the author user.
  userId: Int!

  # The title written by the user.
  title: String!

  # The url of the post.
  url: String

  # The main content text of our post.
  content: String

  # Number of times the post has been visited.
  visit: Int

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime
}

# Represents an update to a Post. Fields that are set will be updated.
input PostPatch {
  # The primary key for the post.
  id: Int

  # The id of the author user.
  userId: Int

  # The title written by the user.
  title: String

  # The url of the post.
  url: String

  # The main content text of our post.
  content: String

  # Number of times the post has been visited.
  visit: Int

  # The time this post was created.
  createdAt: Datetime

  # The time this post was updated.
  updatedAt: Datetime
}

# A connection to a list of Post values.
type PostsConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # The count of *all* Post you could get from the connection.
  totalCount: Int

  # A list of edges which contains the Post and cursor to aid in pagination.
  edges: [PostsEdge]

  # A list of Post objects.
  nodes: [Post!]
}

# A Post edge in the connection.
type PostsEdge {
  # A cursor for use in pagination.
  cursor: Cursor

  # The Post at the end of the edge.
  node: Post!
}

# Methods to use when ordering Post.
enum PostsOrderBy {
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  NATURAL
  ID_ASC
  ID_DESC
  USER_ID_ASC
  USER_ID_DESC
  TITLE_ASC
  TITLE_DESC
  URL_ASC
  URL_DESC
  CONTENT_ASC
  CONTENT_DESC
  VISIT_ASC
  VISIT_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

# The root query type which gives access points into the data universe.
type Query implements Node {
  # Fetches an object given its globally unique ID.
  node(
    # The globally unique ID.
    nodeId: ID!
  ): Node

  # Reads and enables paginatation through a set of Comment.
  allComments(
    # The method to use when ordering Comment.
    orderBy: CommentsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: CommentCondition
  ): CommentsConnection

  # Reads a single Comment using its globally unique ID.
  comment(
    # The globally unique ID to be used in selecting a single Comment.
    nodeId: ID!
  ): Comment
  commentById(
    # The primary key for the comment.
    id: Int!
  ): Comment

  # Reads and enables paginatation through a set of Post.
  allPosts(
    # The method to use when ordering Post.
    orderBy: PostsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: PostCondition
  ): PostsConnection

  # Reads a single Post using its globally unique ID.
  post(
    # The globally unique ID to be used in selecting a single Post.
    nodeId: ID!
  ): Post
  postById(
    # The primary key for the post.
    id: Int!
  ): Post

  # Reads and enables paginatation through a set of User.
  allUsers(
    # The method to use when ordering User.
    orderBy: UsersOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: UserCondition
  ): UsersConnection

  # Reads a single User using its globally unique ID.
  user(
    # The globally unique ID to be used in selecting a single User.
    nodeId: ID!
  ): User
  userById(
    # The primary unique identifier for the user.
    id: Int!
  ): User

  # Exposes the root query type nested one level down. This is helpful for Relay 1
  # which can only query top level fields if they are in a particular form.
  query: Query!

  # The root query type must be a Node to work well with Relay 1 mutations. This just resolves to query.
  nodeId: ID!
}

# All input for the updateCommentById mutation.
input UpdateCommentByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary key for the comment.
  id: Int!

  # An object where the defined keys will be set on the Comment identified by our unique key.
  commentPatch: CommentPatch!
}

# All input for the updateComment mutation.
input UpdateCommentInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single Comment to be updated.
  nodeId: ID!

  # An object where the defined keys will be set on the Comment identified by our globally unique ID.
  commentPatch: CommentPatch!
}

# The output of our updateComment mutation.
type UpdateCommentPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  comment: Comment

  # Reads a single Post that is related to this Comment.
  postByPostId: Post

  # Reads a single User that is related to this Comment.
  userByUserId: User

  # Reads a single Comment that is related to this Comment.
  commentByCommentId: Comment

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the updatePostById mutation.
input UpdatePostByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary key for the post.
  id: Int!

  # An object where the defined keys will be set on the Post identified by our unique key.
  postPatch: PostPatch!
}

# All input for the updatePost mutation.
input UpdatePostInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single Post to be updated.
  nodeId: ID!

  # An object where the defined keys will be set on the Post identified by our globally unique ID.
  postPatch: PostPatch!
}

# The output of our updatePost mutation.
type UpdatePostPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  post: Post

  # Reads a single User that is related to this Post.
  userByUserId: User

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# All input for the updateUserById mutation.
input UpdateUserByIdInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The primary unique identifier for the user.
  id: Int!

  # An object where the defined keys will be set on the User identified by our unique key.
  userPatch: UserPatch!
}

# All input for the updateUser mutation.
input UpdateUserInput {
  # An arbitrary string value with no semantic meaning. Will be included in the
  # payload verbatim. May be used to track mutations by the client.
  clientMutationId: String

  # The globally unique ID which will identify a single User to be updated.
  nodeId: ID!

  # An object where the defined keys will be set on the User identified by our globally unique ID.
  userPatch: UserPatch!
}

# The output of our updateUser mutation.
type UpdateUserPayload {
  # The exact same clientMutationId that was provided in the mutation input,
  # unchanged and unused. May be used by a client to track mutations.
  clientMutationId: String
  user: User

  # Our root query field type. Allows us to run any query from our mutation payload.
  query: Query
}

# A user of the blog.
type User implements Node {
  # A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  nodeId: ID!

  # The primary unique identifier for the user.
  id: Int!

  # The QQ id for the the user.
  qqId: String

  # The Weibo id for the the user.
  weiboId: String

  # The Facebook id for the the user.
  facebookId: String

  # The Twitter id for the the user.
  twitterId: String

  # The Gitbhub id for the the user.
  githubId: String

  # The avatar address for the the user.
  avatar: String
  timezone: Int

  # The user’s nickname.
  nickname: String!

  # The user’s first name.
  firstName: String

  # The user’s last name.
  lastName: String

  # Whether or not a user can publish a post.
  publisher: Boolean

  # The time this user was created.
  createdAt: Datetime

  # The time this user was updated.
  updatedAt: Datetime

  # Reads and enables paginatation through a set of Post.
  postsByUserId(
    # The method to use when ordering Post.
    orderBy: PostsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: PostCondition
  ): PostsConnection

  # Reads and enables paginatation through a set of Comment.
  commentsByUserId(
    # The method to use when ordering Comment.
    orderBy: CommentsOrderBy = PRIMARY_KEY_ASC

    # Read all values in the set before (above) this cursor.
    before: Cursor

    # Read all values in the set after (below) this cursor.
    after: Cursor

    # Only read the first n values of the set.
    first: Int

    # Only read the last n values of the set.
    last: Int

    # Skip the first n values from our after cursor, an alternative to cursor
    # based pagination. May not be used with last.
    offset: Int

    # A condition to be used in determining which values should be returned by the collection.
    condition: CommentCondition
  ): CommentsConnection
}

# A condition to be used against User object types. All fields are tested for equality and combined with a logical ‘and.’
input UserCondition {
  # Checks for equality with the object’s id field.
  id: Int

  # Checks for equality with the object’s qqId field.
  qqId: String

  # Checks for equality with the object’s weiboId field.
  weiboId: String

  # Checks for equality with the object’s facebookId field.
  facebookId: String

  # Checks for equality with the object’s twitterId field.
  twitterId: String

  # Checks for equality with the object’s githubId field.
  githubId: String

  # Checks for equality with the object’s avatar field.
  avatar: String

  # Checks for equality with the object’s timezone field.
  timezone: Int

  # Checks for equality with the object’s nickname field.
  nickname: String

  # Checks for equality with the object’s firstName field.
  firstName: String

  # Checks for equality with the object’s lastName field.
  lastName: String

  # Checks for equality with the object’s publisher field.
  publisher: Boolean

  # Checks for equality with the object’s createdAt field.
  createdAt: Datetime

  # Checks for equality with the object’s updatedAt field.
  updatedAt: Datetime
}

# A user of the blog.
input UserInput {
  # The primary unique identifier for the user.
  id: Int

  # The QQ id for the the user.
  qqId: String

  # The Weibo id for the the user.
  weiboId: String

  # The Facebook id for the the user.
  facebookId: String

  # The Twitter id for the the user.
  twitterId: String

  # The Gitbhub id for the the user.
  githubId: String

  # The avatar address for the the user.
  avatar: String
  timezone: Int

  # The user’s nickname.
  nickname: String!

  # The user’s first name.
  firstName: String

  # The user’s last name.
  lastName: String

  # Whether or not a user can publish a post.
  publisher: Boolean

  # The time this user was created.
  createdAt: Datetime

  # The time this user was updated.
  updatedAt: Datetime
}

# Represents an update to a User. Fields that are set will be updated.
input UserPatch {
  # The primary unique identifier for the user.
  id: Int

  # The QQ id for the the user.
  qqId: String

  # The Weibo id for the the user.
  weiboId: String

  # The Facebook id for the the user.
  facebookId: String

  # The Twitter id for the the user.
  twitterId: String

  # The Gitbhub id for the the user.
  githubId: String

  # The avatar address for the the user.
  avatar: String
  timezone: Int

  # The user’s nickname.
  nickname: String

  # The user’s first name.
  firstName: String

  # The user’s last name.
  lastName: String

  # Whether or not a user can publish a post.
  publisher: Boolean

  # The time this user was created.
  createdAt: Datetime

  # The time this user was updated.
  updatedAt: Datetime
}

# A connection to a list of User values.
type UsersConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # The count of *all* User you could get from the connection.
  totalCount: Int

  # A list of edges which contains the User and cursor to aid in pagination.
  edges: [UsersEdge]

  # A list of User objects.
  nodes: [User!]
}

# A User edge in the connection.
type UsersEdge {
  # A cursor for use in pagination.
  cursor: Cursor

  # The User at the end of the edge.
  node: User!
}

# Methods to use when ordering User.
enum UsersOrderBy {
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  NATURAL
  ID_ASC
  ID_DESC
  QQ_ID_ASC
  QQ_ID_DESC
  WEIBO_ID_ASC
  WEIBO_ID_DESC
  FACEBOOK_ID_ASC
  FACEBOOK_ID_DESC
  TWITTER_ID_ASC
  TWITTER_ID_DESC
  GITHUB_ID_ASC
  GITHUB_ID_DESC
  AVATAR_ASC
  AVATAR_DESC
  TIMEZONE_ASC
  TIMEZONE_DESC
  NICKNAME_ASC
  NICKNAME_DESC
  FIRST_NAME_ASC
  FIRST_NAME_DESC
  LAST_NAME_ASC
  LAST_NAME_DESC
  PUBLISHER_ASC
  PUBLISHER_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}
`
;
export default [typeDefinitions];
