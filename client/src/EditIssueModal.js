import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditIssueModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'issue',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Book_Issue_Id:event.target.Book_Issue_Id.value,
                Client_First_Name:event.target.Client_First_Name.value,
                Client_last_Name:event.target.Client_Last_Name.value,
                Book_Id:event.target.Book_Id.value.split(' ').shift(),
                Issue_Date:event.target.Issue_Date.value,
                Due_Date:event.target.Due_Date.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Book_Issue_Id">
                        <Form.Label>Book_Issue_Id</Form.Label>
                        <Form.Control type="text" name="Book_Issue_Id" required 
                        placeholder="Book Issue Id"
                        disabled
                        defaultValue={this.props.bsid}/>
                    </Form.Group>

                    <Form.Group controlId="Client_First_Name">
                        <Form.Label>Client First Name</Form.Label>
                        <Form.Control type="text" name="Client_First_Name" required 
                        defaultValue={this.props.clientfname}
                        placeholder="Client First Name"/>
                    </Form.Group>

                    <Form.Group controlId="Client_Last_Name">
                        <Form.Label>Client Last Name</Form.Label>
                        <Form.Control type="text" name="Client_Last_Name" required 
                        defaultValue={this.props.clientlname}
                        placeholder="Client Last Name"/>
                    </Form.Group>

                    <Form.Group controlId="Book_Id">
                        <Form.Label>Book</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.bookid}>
                        {this.state.deps.map(dep=>
                            <option key={dep.Book_Id}>{dep.Book_Id + ' ' + dep.Book_Title}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Issue_Date">
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Issue_Date"
                        required
                        placeholder="Issue Date"
                        defaultValue={this.props.issuedate}
                        />
                    </Form.Group>

                    <Form.Group controlId="Due_Date">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Due_Date"
                        required
                        placeholder="Due_Date"
                        defaultValue={this.props.duedate}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Issue
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}