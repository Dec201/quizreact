import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';


function Header(){
return(
    <header className="App-header">
        <Navbar bg="dark" variant="dark">
        <Container>
        <QuizOutlinedIcon className="quizIcon" />
        <Navbar.Brand href="#home">QuizFive</Navbar.Brand>
        {/* <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#history">History</Nav.Link>
        </Nav> */}
        </Container>
        </Navbar>
    </header>
)
}

export default Header;