import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import rp from 'request-promise';
import casual from 'casual';
import _ from 'lodash';

//SQL
const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const UserModel = db.define('user', {
  id: { type: Sequelize.UUIDV4, primaryKey: true },
  qqId: { type: Sequelize.STRING },
  weiboId: { type: Sequelize.STRING },
  facebookId: { type: Sequelize.STRING },
  twitterId: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  nickname: { type: Sequelize.STRING },
  timezone: { type: Sequelize.INTEGER },
  publisher: { type: Sequelize.BOOLEAN },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

const PostModel = db.define('post', {
  id: { type: Sequelize.UUIDV4, primaryKey: true },
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
  visits: { type: Sequelize.INTEGER },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
  lastName: { type: Sequelize.STRING },
});

const CommentModel = db.define('comment', {
  id: { type: Sequelize.UUIDV4, primaryKey: true },
  content: { type: Sequelize.STRING },
  locked: { type: Sequelize.BOOLEAN },
  url: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE },
});

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);

//Mongo
const mongo = Mongoose.connect('mongodb://localhost/views');

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

//HTTP
const USDA = {
  getOne() {
    return rp('https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=DEMO_KEY')
      .then((res) => JSON.parse(res))
      .then((res) => {
          console.log(res[0])
        return res[0].foods.food.name;
      });
  },
};



// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return UserModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((user) => {
      return user.createPost({
        title: `A post by ${user.firstName}`,
        text: casual.sentences(3),
      }).then((post) => { // <- the new part starts here
        // create some View mocks
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      });
    });
  });
});

const User = db.models.user;
const Post = db.models.post;

export { User, Post, View, USDA };
