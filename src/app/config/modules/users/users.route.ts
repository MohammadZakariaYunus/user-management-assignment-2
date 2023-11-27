import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()
router.post('/create-users', userControllers.createUser)

router.get('/', userControllers.getAllUsers)

router.get('/:userId', userControllers.getUserById)

// router.get('/:studentId', StudentControllers.getSingleStudent)

export const UsersRoutes = router
