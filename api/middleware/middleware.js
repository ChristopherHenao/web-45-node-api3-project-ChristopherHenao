const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`[${new Date()}] ${req.method} ${req.url}`)
  next()
}

async function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id)
  try {
    if (!user) {
      next({ message: "user not found" , status: 404 })
    }
    else {
      req.user = user
      next()
    }
  }
  catch (error) {
    next(error)
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  try {
    if (!name || !name.trim()) {
      next({ message: "missing required name field", status: 400 })
    }
    else {
      req.name = name.trim()
      next()
    }
  }
  catch (error) {
    next(error)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}