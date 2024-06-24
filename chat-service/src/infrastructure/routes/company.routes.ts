import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
// import { userAuthMiddleware } from "../../utils/middlewares/userAuth";
// import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";



export const companyRoutes = (dependencies: IDependencies) => {
    const {
        createRoom,
        getMessage,
        getRoom,
        sendMessage,
        listAllMessage,
        updateReadStatus
    } = controller(dependencies)

    const router = Router()




    router.route('/sendmessage').post(sendMessage)
    router.route('/getmessage').get(getMessage)
    router.route('/getroom').get(getRoom)
    router.route('/createroom').post(createRoom)
    router.route('/listmessages').get(listAllMessage)
    router.route('/updatereadstatus').patch(updateReadStatus)


    return router
}


