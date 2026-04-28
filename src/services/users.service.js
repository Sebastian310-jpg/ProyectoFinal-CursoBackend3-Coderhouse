import UsersRepository from "../repositories/users.repository.js";
import ValidationError from "../utils/errors/ValidationError.js";
import NotFoundError from "../utils/errors/NotFoundError.js";
import { hashPassword } from "../utils/bcrypt.js";

class UsersService {
  constructor(userRepository = new UsersRepository()){
    this.userRepository = userRepository;
  }

  async getAllUsers(){
    return await this.userRepository.getAllUsers();
  }

  async getUserById(userId){
    if(!userId) throw new ValidationError('User ID is required'); 

    const user = await this.userRepository.getUserById(userId);
    if(!user) throw new NotFoundError('User not found');

    return user;
  }

  async getUserByEmail(userEmail){
    if(!userEmail) throw new ValidationError('User email is required');

    const user = await this.userRepository.getUserByEmail(userEmail);
    if(!user) throw new NotFoundError('User not found');

    return user;
  }

  async createUser(userData){
    if(!userData.first_name) throw new ValidationError('First name is required');
    if(!userData.last_name) throw new ValidationError('Last name is required');
    if(!userData.email) throw new ValidationError('Email is required');
    if(!userData.password) throw new ValidationError('Password is required');

    const existingUser = await this.userRepository.getUserByEmail(userData.email);
    if(existingUser) throw new ValidationError('User with this email already exists');

    const hashedPassword = await hashPassword(userData.password);

    const createdUser = await this.userRepository.createUser({ ...userData, password: hashedPassword });
    return createdUser;
  }

  async updateUser(userId, updateData){
    if(!userId) throw new ValidationError('User ID is required');

    if(updateData.email){
      const existingUser = await this.userRepository.getUserByEmail(updateData.email);

      if(existingUser && existingUser._id.toString() !== userId.toString()) throw new ValidationError('User with this email already exists');
    }

    if(updateData.password){
      const hashedPassword = await hashPassword(updateData.password);

      updateData.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.updateUser(userId, updateData);
    if(!updatedUser) throw new NotFoundError('User not found');

    return updatedUser;
  }

  async deleteUser(userId){
    if(!userId) throw new ValidationError('User ID is required');

    const deletedUser = await this.userRepository.deleteUser(userId);
    if(!deletedUser) throw new NotFoundError('User not found');

    return deletedUser;
  }
}

export default UsersService;