import { User } from '../users.model'
import { TOrder, TUser } from './users.interface'

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(userData)
  return result
}

const getAllUsersFromDB = async () => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          address: 1,
        },
      },
    ])

    if (result.length === 0) {
      throw {
        code: 404,
        description: 'User not found!',
      }
    }

    return {
      success: true,
      data: result,
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'User not found',
      error: {
        code: error.code || 500, // Default to 500 if no code is provided
        description: error.description || 'Internal Server Error',
      },
    }
  }
}

const getUserByIdFromDB = async (userId: string) => {
  const result = await User.aggregate([
    { $match: { userId: userId } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ])
  if (result.length === 0) {
    return 'User not available'
  } else {
    return result
  }
}

const updateUserFromDB = async (
  userId: string,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  })
  return result
}

const addOrderToUser = async (
  userId: string,
  orderData: TOrder | null = null,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true, runValidators: true },
  )
  return result?.toObject() || null
}

const getOrdersByUserId = async (userId: string) => {
  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$orders' },
      {
        $project: {
          _id: 0,
          userId: 1,
          orders: 1,
        },
      },
    ])
    if (result.length === 0) {
      return 'User not available'
    }
    const orders = result.map((item: any) => item.orders)
    return orders
  } catch (err) {
    return {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }
}

const calculateTotalPriceByUserId = async (userId: string) => {
  try {
    const ordersResult = await UserServices.getOrdersByUserId(userId)
    const orders = ordersResult as any[]

    if (!orders) {
      throw new Error('User not found')
    }
    let totalPrice = 0
    for (const order of orders) {
      const orderPrice = parseFloat(order.price)
      const orderQuantity = parseInt(order.quantity)

      if (!isNaN(orderPrice) && !isNaN(orderQuantity)) {
        totalPrice += orderPrice * orderQuantity
      }
    }
    return {
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    }
  } catch (err) {
    return {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }
}

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
  addOrderToUser,
  getOrdersByUserId,
  calculateTotalPriceByUserId,
  deleteUserFromDB,
}
