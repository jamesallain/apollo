import { User, View } from './connectors';

const resolvers = {
  Query: {
    user(_, args) {
      return User.find({ where: args });
    },    
  },  
  User: {
    posts(user) {
      return user.getPosts();
    },
  },
  Post: {
    user(post) {
      return post.getUser();
    },
    views(post) {
      return View.findOne({ postId: post.id })
             .then((view) => view.views);
    },
  },
  Comment: {
    post(comment) {
      return comment.getPost();
    },
  },
};

export default resolvers;
