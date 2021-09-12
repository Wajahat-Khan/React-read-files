import React from 'react';
import usersData from '../../data/users.json';
import leadsData from '../../data/leads.json';

import { Button, Container, Row } from 'react-bootstrap';

import './styles.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        let users = JSON.parse(localStorage.getItem('users'));
        if(!users){
            localStorage.setItem('users', JSON.stringify(usersData));
            localStorage.setItem('leads', JSON.stringify(leadsData));
        }
        this.state = { loggedUser: -1 }
    }

    componentDidMount = () => {
        let users = JSON.parse(localStorage.getItem('users'));
        if(users){
            let active = users.findIndex(u=>u.status === "active");
            this.setState({loggedUser:active});
        }
    }
    selectUser = (e) => {
        let index = e.target.value;
        let users = JSON.parse(localStorage.getItem('users'));
        users.map((data) => {
            data.status = "inactive"
        })
        users[index].status = "active";
        this.setState({ loggedUser: index });
        localStorage.setItem('users', JSON.stringify(users));
    }

    login = () => {
        let users = JSON.parse(localStorage.getItem('users'));
        const loggedIn = users.find(item => item.status === "active");
        if (loggedIn)
            this.props.history.push('/leads');
    }
    logout = () => {
        let users = JSON.parse(localStorage.getItem('users'));
        users.map((data) => {
            data.status = "inactive"
        })
        localStorage.setItem('users', JSON.stringify(users));
        this.setState({ loggedUser: -1 });

    }
    render() {
        let users = JSON.parse(localStorage.getItem('users'));
        return (
            <Container className="login-container">
                <Row>
                    <h2 className="user-heading">User</h2>
                </Row>
                <Row>
                <select id="dropdown-item-button" value={this.state.loggedUser} onChange={this.selectUser}>
                    <option value={-1} disabled selected>Select User</option>
                        {users && users.map((user, index) => {
                            return (<option value={index} as="button">{user.name}</option>
                            )
                        })}
                    </select>
                </Row>
                <Row>
                    <Button variant="primary" className="login-btns" onClick={this.login}>Login</Button>
                </Row>
                <Row>
                    <Button variant="primary" className="login-btns" onClick={this.logout}>Logout</Button>
                </Row>
            </Container>
        )
    }
}


export default LoginPage;
