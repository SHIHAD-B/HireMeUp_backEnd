import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";
import { companyAuthMiddleware } from "../../utils/middlewares/companyAuth";

export const companyRoutes = (dependencies: IDependencies) => {
    const {
        addJob,
        categoryList,
        jobList,
        deleteJob,
        editJob,
        fetchJob,
        fetchApplicants,
        updateStatus,
        scheduleInterview,
        editSchedule,
        fetchSchedule,
        updateScheduleStatus,
        addNotes,
        publishUnpublishJob
    } = controller(dependencies)

    const router = Router()

    router.use(companyAuthMiddleware)

    router.route('/joblist').get(jobList)
    router.route('/categorylist').get(categoryList)
    router.route('/fetchjob/:id').get(fetchJob)
    router.route('/fetchapplicants/:id').get(fetchApplicants)
    router.route('/fetchschedule/:id').get(fetchSchedule)


    router.route('/addjob').post(addJob)
    router.route('/sheduleinterview').post(scheduleInterview)
    router.route('/addnotes').post(addNotes)

    router.route('/deletejob').patch(deleteJob)
    router.route('/editjob').patch(editJob)
    router.route('/updatestatus').patch(updateStatus)
    router.route('/editschedule').patch(editSchedule)
    router.route('/updateschedulestatus').patch(updateScheduleStatus)
    router.route('/publishUnpublish').patch(publishUnpublishJob)

    return router
}