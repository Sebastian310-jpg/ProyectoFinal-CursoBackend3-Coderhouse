import UserModel from "../models/user.model.js";

class UsersDao {
  async getAllUsers(){
    return await UserModel.find();
  }

  async getUserById(userId){
    return await UserModel.findById(userId);
  }

  async getUserByEmail(userEmail){
    return await UserModel.findOne({ email: userEmail });
  }

  async createUser(userData){
    return await UserModel.create(userData);
  }

  async updateUser(userId, updateData){
    return await UserModel.findByIdAndUpdate(userId, updateData, { returnDocument: 'after' });
  }

  async deleteUser(userId){
    return await UserModel.findByIdAndDelete(userId);
  }
}

export default UsersDao;