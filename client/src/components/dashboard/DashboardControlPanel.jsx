import React from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import { IoIosHome } from "react-icons/io";
import { PiThermometerHot } from "react-icons/pi";

const DashboardControlPanel = () => {
  return (
    <div className=" sidebar">
      <div className="home-selector mt-3">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Home Page
          </Dropdown.Toggle>

          <Button variant="primary" className="m-2">
            + Add Device
          </Button>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Home 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Home 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Add New Home</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" className="m-2">
          Edit Home
        </Button>
        <Button variant="secondary" className="m-2">
          Add Home
        </Button>
      </div>
      <Nav className="flex-column mt-3">
        <Nav.Link href="#climate">
          <PiThermometerHot size="30px" color="red" /> Climate
        </Nav.Link>
        <Nav.Link href="#security">
          <PiThermometerHot size="30px" color="red" /> Security & Sensors
        </Nav.Link>
        <Nav.Link href="#video">
          <PiThermometerHot size="30px" color="red" /> Video
        </Nav.Link>
        <Nav.Link href="#lightning">
          <PiThermometerHot size="30px" color="red" /> Lightning & Modules
        </Nav.Link>
        <Nav.Link href="#geofences">
          <PiThermometerHot size="30px" color="red" /> Geofences
        </Nav.Link>
        <Nav.Link href="#blinds">
          <PiThermometerHot size="30px" color="red" /> Blind & Shades
        </Nav.Link>
        <Nav.Link href="#home-controllers">
          <PiThermometerHot size="30px" color="red" /> Home Controllers
        </Nav.Link>
        <Nav.Link href="#irrigations">
          <PiThermometerHot size="30px" color="red" /> Irrigations
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default DashboardControlPanel;
