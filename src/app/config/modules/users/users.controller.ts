import { Request, Response } from 'express'
import { UserServices } from './users.service'
import userValidationSchema from '../users.validation'

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

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
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
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      age: user.age,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city,
        country: user.address.country,
      },
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getUserByIdFromDB(userId)
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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userData = req.body
    const result = await UserServices.updateUserFromDB(userId, userData)

    if (result) {
      const updatedUserData = {
        username: result.username,
        fullName: {
          firstName: result.fullName.firstName,
          lastName: result.fullName.lastName,
        },
        age: result.age,
        email: result.email,
        address: {
          street: result.address.street,
          city: result.address.city,
          country: result.address.country,
        },
      }

      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: updatedUserData,
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

const deleteUserFromDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
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

export const userControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserFromDB,
}
