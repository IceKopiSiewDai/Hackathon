// __tests__/userController.test.js

const userController = require('../controllers/userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel'); 
jest.mock('jsonwebtoken'); 

describe('userController.login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('Success should be returned for valid email and password', async () => {
    // Mock User.findOne to return a user with valid credentials
    User.findOne.mockResolvedValue({ email: 'john.doe@example.com', password: 'password123' });

    // Mock jwt.sign to return a token
    jwt.sign.mockReturnValue('mocked_token');

    const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: 'mocked_token' });
  });

  it('Error should be returned for invalid email but correct password', async () => {
    // Mock User.findOne to return null for invalid email
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: 'invalid@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  it('Error should be returned for correct email but invalid password', async () => {
    // Mock User.findOne to return a user with valid email but invalid password
    User.findOne.mockResolvedValue({ email: 'john.doe@example.com', password: 'wrong_password' });

    const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });


  it('Error should be returned for empty email and invalid password', async () => {
    // Mock User.findOne to return a user with empty email but existing password
    User.findOne.mockResolvedValue({ email: '', password: 'wrong_password' });

    const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  // Additional examples to give
  // Mock user.findOne to return a user with empty email and empty password

});
