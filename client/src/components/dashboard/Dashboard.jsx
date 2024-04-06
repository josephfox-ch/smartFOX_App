import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Dashboard = () => {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>
                Welcome, {state.user ? state.user.firstName : "User"}!
              </Card.Text>
              <Button variant="primary" onClick={handleLogout}>
                Log out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Dashboard = () => {
//   const { user, logout } = useAuth0();

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Welcome {user.name}!</p>
//       <button onClick={() => logout({ returnTo: window.location.origin })}>
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
