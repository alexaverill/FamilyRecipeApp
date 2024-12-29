import { Link } from "react-router-dom";
import classes from "./PlanCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeletePlan } from "../../API/PlanApi";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
export function PlanCard({ plan, deleteCallback }) {
  const [isDeleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await DeletePlan(plan.planId);
    deleteCallback(plan.planId);
    setDeleting(false);
  };
  return (
    <div className={classes.card}>
      <Link to={`/plans/${plan.planId}`}>{plan.title}</Link>
      <LoadingButton onClick={() => handleDelete()} loading={isDeleting}>
        <DeleteIcon />
      </LoadingButton>
    </div>
  );
}
