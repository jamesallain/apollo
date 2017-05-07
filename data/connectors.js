import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import rp from 'request-promise';
import casual from 'casual';
import _ from 'lodash';

//SQL
//SQL connection
//database, username, password
const db = new Sequelize('ncp', 'nosh', 'postgres', {
  dialect: 'postgres',
  host: 'localhost', //docker host goes here
});

export const UserModel = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  qqId: { type: Sequelize.STRING },
  weiboId: { type: Sequelize.STRING },
  facebookId: { type: Sequelize.STRING },
  twitterId: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
  },
  nickname: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true, //will get: Unhandled rejection SequelizeBaseError: null - if set to "false" and not seeded
    validate: {
      isEmail: true,
    },
  },
  timezone: { type: Sequelize.INTEGER },
  publisher: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
  },
});

export const PostModel = db.define('post', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  title: { type: Sequelize.STRING },
  topic: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING },
  content: { type: Sequelize.TEXT },
  visits: { type: Sequelize.INTEGER },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
  },
});

export const CommentModel = db.define('comment', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  content: { type: Sequelize.TEXT },
  locked: { type: Sequelize.BOOLEAN },
  url: { type: Sequelize.STRING },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
  },
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
      nickname: casual.nickname,
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((user) => {
      return user.createPost({
        title: `A post by ${user.nickname}`,
        url: casual.url,
        content: casual.sentences(3),
      }).then((post) => {
        return post.createComment({
          content: casual.sentences(2),
        });
      });
    });
  });
});

const User = db.models.user;
const Post = db.models.post;
const Comment = db.models.comment;


export { User, Post, Comment, View, USDA };
