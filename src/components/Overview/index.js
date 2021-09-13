import React from 'react';
import './styles.scss';
import { Button, Container, Row, Table } from 'react-bootstrap';
import usersData from '../../data/users.json';
import leadsData from '../../data/leads.json';

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: 0,
      neutral: 0,
      noLead: 0,
      allLeads: JSON.parse(localStorage.getItem('leads'))
    }
  }

  componentDidMount() {
    let leads = JSON.parse(localStorage.getItem('leads'));
    let p = 0;
    let n = 0;
    let nu = 0;
    for (let i = 0; i < leads.length; i++) {
      if (leads[i].status === "Positive") {
        p += 1;
      }
      if (leads[i].status === "Neutral") {
        n += 1;
      }
      if (leads[i].status === "No-Lead") {
        nu += 1;
      }
      this.setState({ positive: p, neutral: n, noLead: nu });
    }
  }
  reset = () => {
    localStorage.setItem('users', JSON.stringify(usersData));
    localStorage.setItem('leads', JSON.stringify(leadsData));
    this.props.history.push('/');
  }

  back = () => {
    this.props.history.push('/leads');
  }

  render() {
    const { allLeads } = this.state;
    return (
      <Container className="overview-container">
        <Row style={{ justifyContent: "space-between" }}>
          <Button variant="warning" size="lg" onClick={this.reset}>Reset Application</Button>
          <p className="overview-title">OVERVIEW PAGE</p>
          <Button variant="warning" size="lg" onClick={this.back}>BACK</Button>
        </Row>
        <div className="stats">
          <Row>Positive Replies: {this.state.positive}</Row>
          <Row>Neutral Replies: {this.state.neutral}</Row>
          <Row>Not a Lead: {this.state.noLead}</Row>
        </div>
        <Row>
          {
            allLeads &&
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email Lead</th>
                  <th>Subject</th>
                  <th>Body</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  allLeads.map((lead, index) => {
                    return (
                      <tr key={index}>
                        <td>{lead?.email_lead}</td>
                        <td>{lead?.subject}</td>
                        <td>{lead?.body}</td>
                        <td>{lead?.status}</td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </Table>
          }

        </Row>
      </Container>
    )
  }
}


export default OverviewPage;
