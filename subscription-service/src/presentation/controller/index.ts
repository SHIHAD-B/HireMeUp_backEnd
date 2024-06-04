import { IDependencies } from "../../domain/interfaces";
import { fetchPlansController } from "./fetchPlansController";
import { addPlansController } from "./addPlanController";
import { deletePlanController } from "./deletePlanController";
import { editPlanController } from "./editPlanController";
import { checkoutSubscriptionController } from "./checkoutSubscription";
import { addSubscriptionController } from "./addSubscriptionController";

export const controller = (dependencies: IDependencies) => {
    return {
        fetchPlans: fetchPlansController(dependencies),
        addPlan: addPlansController(dependencies),
        deletePlan: deletePlanController(dependencies),
        editPlan: editPlanController(dependencies),
        checkoutSubscription: checkoutSubscriptionController(dependencies),
        addSubscription: addSubscriptionController(dependencies)

    }
}