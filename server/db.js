const md5 = require("md5");
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

/**
 * Create a schema for Article, User, Category
 * Create a Model by using the schema defined above
 * this value defaults the name of the collection to plural of model name i.e Article.
 * @type {{Article: *, User: *, Category: *, Follow: *}}
 */
const ArticleSchema = new Schema({
    title:      {type:String, require:true},
    content:    {type:String, require:true},
    author:     {type:Schema.Types.ObjectId, ref:'User'},
    category:   {type:Schema.Types.ObjectId, ref:'Category'},
    created:    {type:Date},
    slug:       {type:String, required: true },
    published:  {type:Boolean, default: false },
    meta:       {type:Schema.Types.Mixed },
    comments:   [Schema.Types.Mixed ]
},{versionKey: false});

const UserSchema = new Schema({
    name:       {type:String, require:true},
    email:      {type:String, require:true},
    password:   {type:String, require:true},
    created:    {type:Date},
    follower:   {
        type:[{
            name:   {type:String, required:true},
            email:  {type:String, required:true}
        }], 
        required:true
    },
    following:  {
        type:[{
            name:   {type:String, required:true},
            email:  {type:String, required:true},
        }], 
        required:true
    }
});

const CategorySchema = new Schema({
    name:      {type:String, require:true},
    slug:       {type:String, require:true},
    created:    {type:Date}
});

//MD5密码和原密码匹配
UserSchema.methods.verifyPassword= function(password){
    let isMatch= md5(password)=== this.password;
    //console.log('UserSchema.methods.verifyPassword: ', password, this.password, isMatch);
    return isMatch;
};

const Models={
    Article : mongoose.model('Article', ArticleSchema),
    User : mongoose.model('User', UserSchema),
    Category : mongoose.model('Category', CategorySchema),
    verify : UserSchema.methods.verifyPassword
};

/**
 * 创建数据库名称并连接
 * Connecting to Mongod instance.
 */
const dbHost = 'mongodb://112.74.207.160:27017/';
mongoose.connect(dbHost);
const db=mongoose.connection;
db.on('error', function () {
    console.log('Database connection error.');
});
db.once('open', function () {
    console.log('The Database has connected.')
});

module.exports = Models;