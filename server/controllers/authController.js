import jwt from 'jsonwebtoken';

// Test credentials
const users = [
  {
    id: 1,
    username: 'student123',
    password: 'password123',
    role: 'student',
    name: 'John Doe'
  },
  {
    id: 2,
    username: 'staff123',
    password: 'password123',
    role: 'staff',
    name: 'Jane Smith'
  },
  {
    id: 3,
    username: 'parent123',
    password: 'password123',
    role: 'parent',
    name: 'Rob Marker'
  }
];

export const login = (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    const user = users.find(
      u => u.username === username && 
      u.password === password && 
      u.role === role
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role,
        name: user.name 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};