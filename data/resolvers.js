import { User, Post, Comment } from './connectors';

const resolvers = {
  Query: {
    user(_, args) {
      return User.find({ where: args });
    },
    allUsers() {
      return User.findAll();
    },
    post(_, args) {
      return Post.find({ where: args });
    },
    allPosts() {
      return Post.findAll();
    },
    comment(_, args) {
      return Comment.find({ where: args });
    },
    allComments() {
      return Comment.findAll();
    },
  },
  User: {
    nodeId: (root, args, contect, info) => {
      return root.id;
    },
    postsByUserId(user) {
      return user.getPosts();
    },
  },
  UsersConnection: {
    edges: (root, args, context, info) => {
      return root.map((users) => { return users; }); 
    },
  },
  UsersEdge: {
    node: (root, args, context, info) => {
      return root;
    },
  },
  Post: {
    nodeId: (root, args, contect, info) => {
      return root.id;
    },
    commentsByPostId(post) {
      return post.getComments();
    },
  },
  PostsConnection: {
    edges: (root, args, context, info) => {
      return root.map((posts) => { return posts; }); 
    },
  },
  PostsEdge: {
    node: (root, args, context, info) => {
      return root;
    },
  },
  Comment: {
    nodeId: (root, args, contect, info) => {
      return root.id;
    },
    commentByCommentId(comment) {
      return comment.getComment();
    },
  },
  CommentsConnection: {
    edges: (root, args, context, info) => {
      return root.map((comments) => { return comments; }); 
    },
  },
  CommentsEdge: {
    node: (root, args, context, info) => {
      return root;
    },
  },
  Mutation: {
    createUser: (root, args) => {
      return User.create({
        qqId: args.input.user.qqId,
        weiboId: args.input.user.weiboId,
        facebookId: args.input.user.facebookId,
        twitterId: args.input.user.twitterId,
        githubId: args.input.user.githubId,
        avatar: args.input.user.avatar,
        nickname: args.input.user.nickname,
        firstName: args.input.user.firstName,
        lastName: args.input.user.lastName,
        publisher: args.input.user.publisher,
      }).then(res => { console.log(res); });
    },
    updateUser: (root, args) => {
      return User.update({
        qqId: args.input.user.qqId,
        weiboId: args.input.user.weiboId,
        facebookId: args.input.user.facebookId,
        twitterId: args.input.user.twitterId,
        githubId: args.input.user.githubId,
        avatar: args.input.user.avatar,
        nickname: args.input.user.nickname,
        firstName: args.input.user.firstName,
        lastName: args.input.user.lastName,
        publisher: args.input.user.publisher,
      }, {
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
    deleteUser: (root, args) => {
      return User.destroy({
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
    createPost: (root, args) => {
      return Post.create({
        title: args.input.post.title,
        url: args.input.post.url,
        content: args.input.post.content,
        visits: args.input.post.visits,
      }).then(res => { console.log(res); });
    },
    updatePost: (root, args) => {
      return Post.update({
        title: args.input.post.title,
        url: args.input.post.url,
        content: args.input.post.content,
        visits: args.input.post.visits,
      }, {
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
    deletePost: (root, args) => {
      return Post.destroy({
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
    createComment: (root, args) => {
      return Post.create({
        content: args.input.comment.content,
        locked: args.input.comment.locked,
      }).then(res => { console.log(res); });
    },
    updateComment: (root, args) => {
      return Post.update({
        content: args.input.comment.content,
        locked: args.input.comment.locked,
      }, {
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
    deleteComment: (root, args) => {
      return Post.destroy({
        where: { id: args.input.id }
      }).then(res => { console.log(res); });
    },
  },
};

export default resolvers;
