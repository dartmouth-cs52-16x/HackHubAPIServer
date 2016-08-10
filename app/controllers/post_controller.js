import Post from '../models/post_model';

// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags, content: post.content };
};

const cleanPosts = (posts) => {
  return posts.map(post => {
    return cleanPost(post);
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
  .then(results => {
    res.json(cleanPosts(results).sort('created_at'));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    res.json(cleanPost(result));
  })
  .catch(error => {
    res.json('error');
  });
};

export const deletePost = (req, res) => {
  Post.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: 'delete success' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    const updatedPost = result;
    updatedPost.title = req.body.title;
    updatedPost.content = req.body.content;
    updatedPost.tags = req.body.tags;
    updatedPost.save();
    res.json(cleanPost(updatedPost));
  })
  .catch(error => {
    res.json({ error });
  });
};
