import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()
router.post('/', userControllers.createUser)

router.get('/', userControllers.getAllUsers)

router.get('/:userId', userControllers.getUserById)

router.put('/:userId', userControllers.updateUserById)

router.delete('/:userId', userControllers.deleteUserFromDB)

export const UsersRoutes = router
