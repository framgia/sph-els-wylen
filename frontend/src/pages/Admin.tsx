import { Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { logoutUser } from "../apiClient/authService";

function Admin() {
  return (
    <div>
      Admin
      <Button variant="primary" type="submit" onClick={logoutUser}>
        Logout
      </Button>
      <Outlet />
    </div>

  )
}

export default Admin