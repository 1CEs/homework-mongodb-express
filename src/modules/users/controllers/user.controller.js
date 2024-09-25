import userService from "../services/user.service.js"

const userController = {
    addUser: async (req, res) => {
        try {
            const latestUser = await userService.getLatestService()
            console.log(latestUser)
            const { name, birth } = req.body
            const payload = {
                id: latestUser && latestUser.id ? latestUser.id + 1 : 1,
                name,
                birth
            }
            const addedUser = await userService.createService(payload)
            res.status(201).json({ data: addedUser, info: { code: 201, message: "User has been added."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    getUsers: async (req, res) => {
        try {
            const searchParams = req.query.search
            const Users = await userService.findService(searchParams)
            res.status(200).json({ data: Users })
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    getUserByID: async (req, res) => {
        try {
            const id = req.params.id
            const User = await userService.findByIDService(parseInt(id))
            res.status(200).json({ data: User, info: { code: 200, message: User ? "User found." : "User not found."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id
            const { name, birth } = req.body
            const payload = {
                id: parseInt(id),
                name,
                birth
            }
            const updatedUser = await userService.updateService(payload)
            res.status(200).json({ data: updatedUser, info: { code: 200, message: "User update successfully." }})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            const deletedUser = await userService.deleteService(parseInt(id))
            res.status(200).json({info: { code: 204, message: "User delete successfully."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    }
}

export default userController