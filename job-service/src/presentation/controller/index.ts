import { IDependencies } from "../../domain/interface"
import { addCategoryController } from "./addCategoryController"
import { addJobController } from "./addJobController"
import { addApplicantController } from "./addApplicantController"
import { editCategoryController } from "./editCategoryController"
import { editJobController } from "./editJobController"
import { deleteApplicantController } from "./deleteApplicantController"
import { deleteCategoryController } from "./deleteCategoryContoller"
import { deleteJobController } from "./deleteJobController"
import { jobListController } from "./jobListController"
import { applicantListController } from "./applicantListController"
import { categoryListController } from "./categoryListController"
import { fetchJobController } from "./fetchJobController"
import { fetchApplicantsController } from "./fetchApplicantsController"
import { updateStatusController } from "./updateStatusController"
import { scheduleInterviewController } from "./scheduleInterviewController"
import { editScheduleController } from "./editScheduleController"
import { fetchScheduleController } from "./fetchSchduleController"
import { updateScheduleStatusController } from "./updateScheduleStatusController"
import { addNoteController } from "./addNoteController"
import { publishUnpublishController } from "./publishUnpublishJobController"

export const controller = (dependencies: IDependencies) => {
    return {
        addCategory: addCategoryController(dependencies),
        addJob: addJobController(dependencies),
        addApplicant: addApplicantController(dependencies),
        editCategory: editCategoryController(dependencies),
        editJob: editJobController(dependencies),
        deleteApplicant: deleteApplicantController(dependencies),
        deleteCategory: deleteCategoryController(dependencies),
        deleteJob: deleteJobController(dependencies),
        jobList: jobListController(dependencies),
        applicantList: applicantListController(dependencies),
        categoryList: categoryListController(dependencies),
        fetchJob: fetchJobController(dependencies),
        fetchApplicants: fetchApplicantsController(dependencies),
        updateStatus: updateStatusController(dependencies),
        scheduleInterview: scheduleInterviewController(dependencies),
        fetchSchedule: fetchScheduleController(dependencies),
        editSchedule: editScheduleController(dependencies),
        updateScheduleStatus: updateScheduleStatusController(dependencies),
        addNotes: addNoteController(dependencies),
        publishUnpublishJob: publishUnpublishController(dependencies)
    }
}
