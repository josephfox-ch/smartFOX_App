import React from 'react';
import { Nav, Dropdown, Button } from 'react-bootstrap';
import { IoIosHome, IoIosAddCircleOutline } from 'react-icons/io';

const DashboardControlPanel = () => {
  return (
    <div className=" sidebar">
      <div className="home-selector">
        <Dropdown>
          <Dropdown.Toggle variant="success"  id="dropdown-basic">
            Select Home
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Home 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Home 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Add New Home</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" className="m-2">Edit Home</Button>
        <Button variant="secondary" className="m-2">Add Home</Button>
      </div>
      <Nav className="flex-column mt-3">
        <Nav.Link href="#climate">
          <IoIosHome /> Climate
        </Nav.Link>
        <Nav.Link href="#security">
          <IoIosHome /> Security & Sensors
        </Nav.Link>
     
      </Nav>
    </div>
  );
};

export default DashboardControlPanel;
