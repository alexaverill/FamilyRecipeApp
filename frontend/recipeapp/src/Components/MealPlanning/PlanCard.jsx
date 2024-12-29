import { Link } from "react-router-dom";
import classes from "./PlanCard.module.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeletePlan } from "../../API/PlanApi";
export function PlanCard({ plan, deleteCallback }) {
  const handleDelete = async () => {
    console.log(plan.planId);
    await DeletePlan(plan.planId);
    deleteCallback(plan.planId);
  };
  return (
    <div className={classes.card}>
      <Link to={`/plans/${plan.planId}`}>{plan.title}</Link>
      <Button onClick={() => handleDelete()}>
        <DeleteIcon />
      </Button>
    </div>
  );
}
