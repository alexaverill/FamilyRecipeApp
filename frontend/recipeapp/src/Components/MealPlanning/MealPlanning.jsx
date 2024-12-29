import EditMealPlan from "./EditMealPlan/EditMealPlan";
import { UserContext } from "../UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { GetPlans } from "../../API/PlanApi";
import { Link } from "react-router-dom";
import classes from "./MealPlanning.module.css";
import { PlanCard } from "./PlanCard";

export default function MealPlanning() {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [sharedPlans, setSharedPlans] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    console.log(user);
    let plans = await GetPlans({
      userId: user?.userId?.toString(),
    });
    setPlans(plans.plans);
    setSharedPlans(plans.shared);
    setLoading(false);
  };
  const updatePlanList = (planId) => {
    let planIndex = plans.findIndex((plan) => plan.planId === planId);
    if (planIndex != -1) {
      let newPlans = plans;
      newPlans.splice(planIndex, 1);
      setPlans([...newPlans]);
      return;
    }
    let sharedIndex = sharedPlans.findIndex((plan) => plan.planId === planId);
    if (sharedIndex != -1) {
      let newPlans = sharedPlans;
      newPlans.splice(planIndex, 1);
      setSharedPlans([...newPlans]);
      return;
    }
  };
  let planCards = plans.map((plan) => {
    return <PlanCard plan={plan} deleteCallback={(id) => updatePlanList(id)} />;
  });
  let sharedCards = sharedPlans.map((plan) => {
    return <PlanCard plan={plan} deleteCallback={(id) => updatePlanList(id)} />;
  });
  return (
    <div className={classes.container}>
      <h1>Meal Planning!</h1>
      <div className={classes.titleRow}>
        <h2>Your Meal Plans</h2>
        <Link component="button" to="/plans/null" className="recipeLinkButton">
          Add Plan
        </Link>
      </div>
      {planCards}
      {sharedCards}
    </div>
  );
}
