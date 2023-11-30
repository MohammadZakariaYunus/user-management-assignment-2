import { Request, Response } from 'express'
import { UserServices } from './users.service'
import userValidationSchema from '../users.validation'

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const { users: usersData } = req.body

//     const { error, value } = userValidationSchema.validate(usersData)
//     const result = await UserServices.createUserIntoDB(value)

//     res.status(200).json({
//       success: true,
//       message: 'New User is created successfully',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     })
//   }
// }

const createUser = async (req: Request, res: Response) => {
  try {
    const { users: usersData } = req.body
    const { error, value } = userValidationSchema.validate(usersData)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details,
      })
    }

    const result = await UserServices.createUserIntoDB(value)
    const userObject: any = result.toObject()
    delete userObject.password

    res.status(200).json({
      success: true,
      message: 'New User is created successfully',
      data: userObject,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()
    const filteredResult = result.map(user => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }))

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: filteredResult,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const deleteUserFromDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getUserByIdFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

export const userControllers = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserFromDB,
}
