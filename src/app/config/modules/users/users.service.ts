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
  const result = await User.find()
  return result
}

const getUserByIdFromDB = async (userId: string) => {
  const result = await User.aggregate([{ $match: { userId: userId } }])
  return result
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
  userData: TUser,
  orderData: TOrder | null = null,
): Promise<TUser | null> => {
  try {
    const user = await User.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      return null
    }
    if (orderData) {
      user.orders.push(orderData)
    }
    const updatedUser = await user.save()
    return updatedUser.toObject()
  } catch (error) {
    throw new Error('Error updating user in the database')
  }
}

const getOrdersByUserId = async (userId: string) => {
  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$orders' }, // Unwind the orders array
      {
        $project: {
          _id: 0,
          userId: 1,
          orders: 1,
        },
      },
    ])

    if (result.length === 0) {
      return null // No user or orders found
    }

    // Extract the orders array from the result
    const orders = result.map((item: any) => item.orders)

    return orders
  } catch (error) {
    throw new Error('Error retrieving orders from the database')
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
  deleteUserFromDB,
}
