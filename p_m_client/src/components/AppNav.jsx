import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'



const AppNav= ()=> {

    return (
        <Navbar bg="light" variant="light">
            <Nav >
                <Nav.Link  href="/"><span className='nav'>  Home  </span></Nav.Link>
                <br/>
                <Nav.Link href="/#/signUp"><span className='nav'>  Sign Up  </span></Nav.Link>
                <br/>
                <Nav.Link href="/#/signin"><span className='nav'>  Sign In  </span></Nav.Link>
            </Nav>

        </Navbar>

    )
}
export default AppNav