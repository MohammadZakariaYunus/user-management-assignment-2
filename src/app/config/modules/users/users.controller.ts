import { Request, Response } from 'express'
import { UserServices } from './users.service'
import userValidationSchema from '../users.validation'

// Creating a New User

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
        message: 'User created successfully!',
        data: updatedUserData,
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      })
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

// Getting a All User

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
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

// Get Single User

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getUserByIdFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
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

// Updating User

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
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// Adding Orders

const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userData = req.body
    const result = await UserServices.addOrderToUser(userId, userData)

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
        orders: result.orders,
      }
      res.status(200).json({
        status: 'success',
        message: 'Order added to user successfully',
        data: updatedUserData,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
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

// Getting a single User Orders

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getOrdersByUserId(userId)
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

// Calculate User total order Price

const calculateUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.calculateTotalPriceByUserId(userId)

    if (result.success) {
      if (result.data) {
        res.status(200).json({
          success: true,
          message: 'Total price calculated successfully!',
          data: {
            totalPrice: result.data.totalPrice,
          },
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: {
            code: 500,
            description: 'Data not available in the response!',
          },
        })
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    })
  }
}

// Deleting a User

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
  addOrderToUser,
  getSingleUserOrders,
  calculateUserOrders,
  deleteUserFromDB,
}
