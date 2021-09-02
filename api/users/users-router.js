const express = require('express');


const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await Users.get()
  try {
    res.json(users)
  }
  catch (error) {
    next(error)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await Users.insert({ name: req.name })
    res.status(201).json(user)
  }
  catch (error) {
    next(error)
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  try {
    const updatedUser = await Users.update(req.params.id, { name: req.name })
    res.json(updatedUser)
  }
  catch (error) {
    next(error)
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id)
    res.json(req.user)
  }
  catch (error) {
    next(error)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id)
    res.json(posts)
  }
  catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const newPost = await Posts.insert({ text: req.text, user_id: req.params.id })
    res.json(newPost)
  }
  catch (error) {
    next(error)
  }
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message })
});


module.exports = router