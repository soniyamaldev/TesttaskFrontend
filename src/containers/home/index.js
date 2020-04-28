import React from 'react';
import {Button, Table, Row, Col, Form} from 'react-bootstrap';
import _ from 'lodash';
import assignButlerService from '../../services/assignButlerService';
import Container from 'react-bootstrap/Container';

import './styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newClientRequest: {
        clientId: 0,
        requestId: '',
        hours: 0
      },
      clientRequests: [
        {
          clientId: 3,
          requestId: "www",
          hours: 7
        }
      ],
      clientReqData: []
    }
  }

  assignButlers = () => {
    const {clientRequests} = this.state;
    assignButlerService.assignButlers(clientRequests).then((data) => {
      this.setState({clientReqData: data.response});
    }).catch((error) => {
      console.log('error', error);
    })
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    let {newClientRequest} = this.state;
    const numProps = ['clientId', 'hours'];
    if (numProps.includes(name)) {
      newClientRequest[name] = Number(value);
    } else {
      newClientRequest[name] = value;
    }
    this.setState({newClientRequest});
  };

  addClientRequest = () => {
    const {clientRequests, newClientRequest} = this.state;
    clientRequests.push({...newClientRequest});
    this.setState({clientRequests});
  };

  render() {
    const {clientRequests, newClientRequest: {clientId, requestId, hours}, clientReqData} = this.state;
    return (
      <div className="my-4">
        <Container>
          <Row>
            <Col md={12}>
              <h4 className="mb-3">Client requests</h4>
            </Col>
          </Row>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    type="number"
                    name='clientId'
                    placeholder='clientId'
                    value={clientId}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    type="text"
                    name='requestId'
                    placeholder='requestId'
                    value={requestId}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Form.Control
                    type="number"
                    name='hours'
                    placeholder='hours'
                    value={hours}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <Button onClick={this.addClientRequest}>Add</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
          <Row>
            <Col md={12}>
              <div className="custom-table">
                <Table responsive="sm" striped bordered hover size="sm">
                  <thead>
                  <tr>
                    <th>Client id</th>
                    <th>Request id</th>
                    <th>Hours</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    clientRequests.map((client, key) => (
                      <tr key={key}>
                        <td>{client.clientId}</td>
                        <td>{client.requestId}</td>
                        <td>{client.hours}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Button onClick={this.assignButlers}>Assign butlers</Button>
          {
            clientReqData.length > 0 &&
            <div className="mt-3">
              <Row>
                <Col md={12}>
                  <h6 className="mb-3">Butler allocation table</h6>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="custom-table">
                    <Table striped bordered hover size="sm" responsive="sm">
                      <thead>
                      <tr>
                        <th>Butler id</th>
                        <th>Name</th>
                        <th>Available Time</th>
                        <th>Client</th>
                        <th>Allocated time</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        clientReqData.map((item, key) => (
                          _.map(item.clients, (val) => (
                            <tr key={key}>
                              <td>{item.butlerId}</td>
                              <td>{item.name}</td>
                              <td>{item.availableTime}</td>
                              <td>{val.clientId}</td>
                              <td>{val.hoursAllocated}</td>
                            </tr>
                          ))
                        ))
                      }
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Container>
      </div>
    );
  }
}

export default Home;
