const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPost} = require('./models');

// return all current blog posts
router.get('/', (req, res) => {
  BlogPost
    .find()
    .then(posts => {
      res.json(posts.map(post => post.apiRepr()));
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"
      });
    });
});

// return one blog post by id
router.get('/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .then(post => res.json(post.apiRepr()))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: "Internal Server Error"
      });
    });
});

// create a new blog post
router.post('/', (req, res) => {
  const requiredFields = ['title', 'content'];
  console.log(req.body);
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
    .then(
      post => res.status(201).json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

// catch-all endpoint if client makes request to non-existent endpoint
router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = router;
