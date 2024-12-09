import EditMealPlan from "./EditMealPlan/EditMealPlan";
import { UserContext } from "../UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { GetPlans } from "../../API/PlanApi";
import { Link } from "react-router-dom";
import classes from "./MealPlanning.module.css";
export default function MealPlanning() {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    console.log(user.userId);
    let plans = await GetPlans({
      userId: "dd2878ee-5a5c-400c-a569-043b4965e73a",
    });
    console.log(plans);
    setPlans(plans);
  };
  let planCards = plans.map((plan) => {
    return (
      <div>
        <Link to={`/plans/${plan.planId}`}>{plan.title}</Link>
      </div>
    );
  });
  return (
    <div className={classes.container}>
      <h1>Meal Planning!</h1>
      <div>
        <div className={classes.titleRow}>
          <h2>Your Meal Plans</h2>

          <Link
            component="button"
            to="/plans/null"
            className="recipeLinkButton"
          >
            Add Plan
          </Link>
        </div>
        <Link to="/plans/1f4e8336-039d-4205-9746-7dd9e8496b49">
          Christmas 2024
        </Link>
        {planCards}
      </div>
    </div>
  );
}
