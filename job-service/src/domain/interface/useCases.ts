
import { IDependencies } from './dependencies';
import {
    IAddApplicantsUseCase,
    IAddCategoryUseCase,
    IAddJobUseCase,
    IDeleteApplicantUseCase,
    IDeleteCategoryUseCase,
    IDeleteJobUseCase,
    IEditCategoryUseCase,
    IEditJob,
    IListJobUseCase,
    IListApplicants,
    IListCategoryUseCase,
    IFetchJobJobUseCase,
    IFetchApplicants,
    IUpdateStatusUseCase,
    ISchduleInterviewUseCase,
    IEditSchedule,
    IFetchScheduleUseCase,
    IUpdateScheduleStatusUseCase,
    IAddNoteUseCase,
    IPublishUnpublishUseCase
} from '../useCaseInterface'

export interface IUseCases {
    listJobsUseCase: (dependencies: IDependencies) => IListJobUseCase;
    listCategoryUseCase: (dependencies: IDependencies) => IListCategoryUseCase;
    listApplicantsUseCase: (dependencies: IDependencies) => IListApplicants;
    editJobUseCase: (dependencies: IDependencies) => IEditJob;
    editCategoryUseCase: (dependencies: IDependencies) => IEditCategoryUseCase;
    deleteJobUseCase: (dependencies: IDependencies) => IDeleteJobUseCase;
    deleteCategoryUseCase: (dependencies: IDependencies) => IDeleteCategoryUseCase;
    deleteApplicantsUseCase: (dependencies: IDependencies) => IDeleteApplicantUseCase;
    addJobUseCase: (dependencies: IDependencies) => IAddJobUseCase;
    addCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
    addApplicantsUseCase: (dependencies: IDependencies) => IAddApplicantsUseCase;
    fetchJobsUseCase: (dependencies: IDependencies) => IFetchJobJobUseCase;
    fetchApplicantsUseCase: (dependencies: IDependencies) => IFetchApplicants;
    updateStatusUseCase: (dependencies: IDependencies) => IUpdateStatusUseCase;
    scheduleInterviewUseCase: (dependencies: IDependencies) => ISchduleInterviewUseCase;
    fetchScheduleUseCase: (dependencies: IDependencies) => IFetchScheduleUseCase;
    editScheduleUseCase: (dependencies: IDependencies) => IEditSchedule;
    updateScheduleStatusUseCase: (dependencies: IDependencies) => IUpdateScheduleStatusUseCase;
    addNoteUseCase: (dependencies: IDependencies) => IAddNoteUseCase
    publishUnpublishJobUseCase: (dependencies: IDependencies) => IPublishUnpublishUseCase
}