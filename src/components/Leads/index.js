import React from 'react';
import './styles.scss';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import usersData from '../../data/users.json';
import leadsData from '../../data/leads.json';

class LeadsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allLeads: [], selected: {}, index: 0, completed: false }
  }

  componentDidMount = () => {
    let leads = JSON.parse(localStorage.getItem('leads'));
    if (leads) {
      let toProcess = leads.find(lead => lead.status === "pending");
      if (toProcess === undefined) {
        this.setState({ completed: true })
      }
      this.setState({ allLeads: leads, selected: toProcess, index: leads.indexOf(toProcess) });
    }
  }

  nextLeadAuto = () => {
    const { allLeads, index } = this.state;

    allLeads[index].status = "Un-Processed";
    localStorage.setItem('leads', JSON.stringify(allLeads));
    this.showError();
    let tempIndex = index + 1;
    for (let i = tempIndex; i < allLeads.length; i++) {
      if (allLeads[i].status === "pending") {
        this.setState({ allLeads, selected: allLeads[i], index: i });
        return;
      }
    }
    this.props.history.push('/overview');
  }

  NotLead = () => {
    const { allLeads, index } = this.state;

    allLeads[index].status = "No-Lead";
    localStorage.setItem('leads', JSON.stringify(allLeads));
    let tempIndex = index + 1;
    for (let i = tempIndex; i < allLeads.length; i++) {
      if (allLeads[i].status === "pending") {
        this.setState({ allLeads, selected: allLeads[i], index: i });
        return;
      }
    }
    this.props.history.push('/overview');
  }

  postiveLead = () => {
    const { allLeads, index } = this.state;

    allLeads[index].status = "Positive";
    localStorage.setItem('leads', JSON.stringify(allLeads));
    let tempIndex = index + 1;
    for (let i = tempIndex; i < allLeads.length; i++) {
      if (allLeads[i].status === "pending") {
        this.setState({ allLeads, selected: allLeads[i], index: i });
        return;
      }
    }
    this.props.history.push('/overview');
  }

  neutralLead = () => {
    const { allLeads, index } = this.state;
    allLeads[index].status = "Neutral";
    localStorage.setItem('leads', JSON.stringify(allLeads));
    let tempIndex = index + 1;
    for (let i = tempIndex; i < allLeads.length; i++) {
      if (allLeads[i].status === "pending") {
        this.setState({ allLeads, selected: allLeads[i], index: i });
        return;
      }
    }
    this.props.history.push('/overview');
  }

  showError = () => {
    return (NotificationManager.error('Error message', 'The Email was unprocessed'));
  }

  reset = () => {
    localStorage.setItem('users', JSON.stringify(usersData));
    localStorage.setItem('leads', JSON.stringify(leadsData));
    this.props.history.push('/');
  }

  exit = () => {
    this.props.history.push('/')
  }
  
  overview = () => {
    console.log("here")
    this.props.history.push('/overview')
  }

  render() {
    const { selected, completed } = this.state;
    if (completed) {
      return (
        <Container className="leads-container">
          All Leads are Processed
          <Row>
            <Col>
              <Button onClick={this.reset} variant="outline-dark" className="reset-btn">Reset Application</Button>
            </Col>
          </Row>
        </Container>
      )
    }
    else return (
      <Container className="leads-container">
        <Row style={{ justifyContent: "space-between" }}>
          <CountdownCircleTimer
            isPlaying
            duration={120}
            size={50}
            strokeWidth={5}
            colors={[
              ['#004777', 0.33],
              ['#F7B801', 0.33],
              ['#A30000', 0.33],
            ]}
            onComplete={() => {
              this.nextLeadAuto();
              return [true, 3000]
            }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
          <Button onClick={this.overview} variant="outline-dark"  size="lg">Overview</Button>
          <Button onClick={this.exit} variant="outline-dark"  size="lg">Exit</Button>

        </Row>
        <Row className="actions">
          <Button variant="secondary" onClick={this.postiveLead}>POSITIVELY REPLY</Button>
          <Button variant="secondary" onClick={this.neutralLead}>NEUTRAL REPLY</Button>
          <Button variant="secondary" onClick={this.NotLead}>NOT A LEAD</Button>
        </Row>
        <Row>
          <Col className="form-element email-text">{selected?.email_lead}</Col>
        </Row>
        <Row>
          <Col className="form-element">
            <Form.Control type="text" placeholder="Subject" value={selected?.subject} disabled />
          </Col>
        </Row>
        <Row>
          <Col className="form-element">
            <Form.Control as="textarea" rows={8} placeholder="Body" value={selected?.body} disabled />
          </Col>
        </Row>
        <NotificationContainer />
      </Container>
    )
  }
}


export default LeadsPage;
