const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  title: {type: String, required: true}
});  

blogPostSchema.virtual('authorFullName').get(function(){
  return `${this.author.firstName} ${this.author.firstName}`.trim();
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorFullName,
    created: this.created
  };
}

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};