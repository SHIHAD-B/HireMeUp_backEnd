import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
// import { userAuthMiddleware } from "../../utils/middlewares/userAuth";
// import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";



export const userRoutes = (dependencies: IDependencies) => {
    const {
        createRoom,
        getMessage,
        getRoom,
        sendMessage,
        listAllMessage
    } = controller(dependencies)

    const router = Router()




    router.route('/sendmessge').post(sendMessage)
    router.route('/getmessage').get(getMessage)
    router.route('/getroom').get(getRoom)
    router.route('/createroom').post(createRoom)
    router.route('/listmessages').get(listAllMessage)


    return router
}


