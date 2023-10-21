import "./dashboardStyle.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categories";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total, loading } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return <div>Categories: {loading ? "..." : total}</div>;
};

export default DashboardPage;
