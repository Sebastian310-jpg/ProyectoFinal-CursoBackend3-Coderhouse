import UsersService from "../services/users.service.js";

class UsersController {
  constructor(userService = new UsersService()){
    this.userService = userService;
  }

  // GET /api/users
  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json({ status: 'success', message: 'Users obtained successfully', payload: users });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:uid
  getUserById = async (req, res, next) => {
    try {
      const { uid: userId } = req.params;

      const user = await this.userService.getUserById(userId);

      res.status(200).json({ status: 'success', message: 'User obtained successfully', payload: user });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/users
  createUser = async (req, res, next) => {
    try {
      const userData = req.body;

      const createdUser = await this.userService.createUser(userData);

      res.status(201).json({ status: 'success', message: 'User created successfully', payload: createdUser });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/users/:uid
  updateUser = async (req, res, next) => {
    try {
      const { uid: userId } = req.params;
      const updateData = req.body;

      const updatedUser = await this.userService.updateUser(userId, updateData);

      res.status(200).json({ status: 'success', message: 'User successfully updated', payload: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/users/:uid
  deleteUser = async (req, res, next) => {
    try {
      const { uid: userId } = req.params;

      const deletedUser = await this.userService.deleteUser(userId);

      res.status(200).json({ status: 'success', message: 'User successfully deleted', payload: deletedUser });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;