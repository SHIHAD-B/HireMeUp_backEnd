import { IDependencies } from "../../domain/interfaces";
import { fetchPlansController } from "./fetchPlansController";
import { addPlansController } from "./addPlanController";
import { deletePlanController } from "./deletePlanController";
import { editPlanController } from "./editPlanController";

export const controller = (dependencies: IDependencies) => {
    return {
        fetchPlans: fetchPlansController(dependencies),
        addPlan: addPlansController(dependencies),
        deletePlan: deletePlanController(dependencies),
        editPlan: editPlanController(dependencies)

    }
}