import { removeToken } from "../services/TokenService";
import { Link } from "react-router-dom";

function Logout(props) {
  let logout = () => {
    removeToken();
    window.location.replace("/");
  };
  return (
    <div
      className="modal fade popup"
      id="modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-body py-5">
            <p className="h4 text-center text-primary">
              Do You Want to Logout?
            </p>
            <div className="d-flex justify-content-center">
              <Link
                to
                type="button"
                className="btn btn-danger me-4 "
                onClick={logout}
              >
                Logout
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
