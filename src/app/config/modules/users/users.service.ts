import { UserModel } from '../users.model'
import { User } from './users.interface'

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}
const getAllUsersFromDB = async () => {
  const result = await UserModel.find()
  return result
}

const getUserByIdFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
}

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student)
//   return result
// }

// const getAllStudentsFromDB = async () => {
//   const result = await StudentModel.find()
//   return result
// }

// const getSingleStudentFromDB = async (id: string) => {
//   const result = await StudentModel.findOne({ id })
//   return result
// }

// export const StudentServices = {
//   createStudentIntoDB,
//   getAllStudentsFromDB,
//   getSingleStudentFromDB,
// }
