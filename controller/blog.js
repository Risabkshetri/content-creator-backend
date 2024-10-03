const model = require('../model/blog');
const Blog = model.blog;

// Create
exports.createBlog = async (req, res) => {
  try {
    let result;
    if (Array.isArray(req.body)) {
      result = await Blog.insertMany(req.body);
    } else {
      const blog = new Blog(req.body);
      result = await blog.save();
    }

    res.status(201).json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate key error. Blog with this title already exists." });
    }
    console.error("Error in createBlog:", err);
    res.status(500).json({ error: "An error occurred while creating blog(s)" });
  }
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// exports.getBlog = async (req, res) => {
//   const id = req.params.id;
//   const blog = await Blog.findById(id);
//   res.json(blog);
// };
exports.getBlog = async (req, res) => {
  try {
    const id = req.params.id; // Get the id from the route params
    console.log({ id }); // For debugging purposes

    const blog = await Blog.findById(id); // Use findById to get a specific blog by its ID
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog); // Return the specific blog
  } catch (error) {
    console.error(error); // Log any errors that occur
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.getBlogContent = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id, { content: 1, title: 1, author: 1 }); 
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.json(blog);  
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


exports.replaceBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Blog.findOneAndReplace({_id:id}, req.body, {new:true})
    res.status(201).json(doc);
  }
  catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
};


exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Blog.findOneAndUpdate({_id:id}, req.body, {new:true})
    res.status(201).json(doc);
  }
  catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete({_id:id});
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};
