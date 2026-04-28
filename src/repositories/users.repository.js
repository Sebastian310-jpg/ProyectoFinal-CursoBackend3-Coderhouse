import UsersDao from '../dao/users.dao.js';

class UsersRepository {
  constructor(userDao = new UsersDao()) {
    this.userDao = userDao;
  }

  async getAllUsers() {
    return await this.userDao.getAllUsers();
  }

  async getUserById(userId) {
    return await this.userDao.getUserById(userId);
  }

  async getUserByEmail(userEmail) {
    return await this.userDao.getUserByEmail(userEmail);
  }

  async createUser(userData) {
    return await this.userDao.createUser(userData);
  }

  async updateUser(userId, updateData) {
    return await this.userDao.updateUser(userId, updateData);
  }

  async deleteUser(userId) {
    return await this.userDao.deleteUser(userId);
  }
}

export default UsersRepository;