import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useSecureAxios from "../hooks/useSecureAxios";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const secureAxios = useSecureAxios();

  // console.log(jobs);
  useEffect(() => {
    secureAxios
      .get("/job-application", {
        params: { email: user.email }, // Pass params as an object
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);

  return (
    <div>
      <h1>My reviews {jobs.length}</h1>
    </div>
  );
};

export default MyReviews;
