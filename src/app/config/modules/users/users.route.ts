import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()
router.post('/create-users', userControllers.createUser)

router.get('/', userControllers.getAllUsers)

router.get('/:userId', userControllers.getUserById)

router.delete('/:userId', userControllers.deleteUserFromDB)

export const UsersRoutes = router
