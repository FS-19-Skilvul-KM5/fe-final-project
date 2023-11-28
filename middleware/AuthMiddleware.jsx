import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = Cookies.get("token");

    if (!token && location.pathname !== "/signup") {
      // If there is no token and not on the signup page, redirect to signin
      navigate("/signin");
    } else if (
      token &&
      (location.pathname === "/signin" || location.pathname === "/signup")
    ) {
      // If there is a token and trying to access signin or signup, redirect to the home page
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

AuthMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthMiddleware;
