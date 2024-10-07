const User = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error registering user' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'User not found' 
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ 
        message: 'Invalid password' 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username 
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in' 
    });
  }
};
    

// // Create
// exports.createUser = async (req, res) => {
//   try {
//     let result;
//     if (Array.isArray(req.body)) {
//       result = await User.insertMany(req.body);
//     } else {
//       const user = new User(req.body);
//       result = await user.save();
//     }

//     res.status(201).json(result);
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({ error: err.message });
//     }
//     if (err.code === 11000) {
//       return res.status(409).json({ error: "Duplicate key error. User with this username or email already exists." });
//     }
//     console.error("Error in createUser:", err);
//     res.status(500).json({ error: "An error occurred while creating user(s)" });
//   }
// };

// // Read all
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error("Error in getAllUsers:", err);
//     res.status(500).json({ error: "An error occurred while fetching users" });
//   }
// };

// // Read one
// exports.getUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error in getUser:", err);
//     res.status(500).json({ error: "An error occurred while fetching the user" });
//   }
// };

// // Update (Replace)
// exports.replaceUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const doc = await User.findOneAndReplace({_id: id}, req.body, {new: true});
//     if (!doc) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(doc);
//   } catch (err) {
//     console.error("Error in replaceUser:", err);
//     res.status(400).json({ error: "An error occurred while replacing the user" });
//   }
// };

// // Update (Partial)
// exports.updateUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const doc = await User.findOneAndUpdate({_id: id}, req.body, {new: true});
//     if (!doc) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(doc);
//   } catch (err) {
//     console.error("Error in updateUser:", err);
//     res.status(400).json({ error: "An error occurred while updating the user" });
//   }
// };

// // Delete
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(deletedUser);
//   } catch (err) {
//     console.error("Error in deleteUser:", err);
//     res.status(500).json({ error: "An error occurred while deleting the user" });
//   }
// };
