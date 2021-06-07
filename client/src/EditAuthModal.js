import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditAuthModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'author',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Author_Id:event.target.Author_Id.value,
                Author_First_Name:event.target.Author_First_Name.value,
                Author_Last_Name:event.target.Author_Last_Name.value,
                Author_Alias:event.target.Author_Alias.value,
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
            Edit Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Author_Id">
                        <Form.Label>Author Id</Form.Label>
                        <Form.Control type="text" name="Author_Id" required
                        disabled
                        defaultValue={this.props.authid} 
                        placeholder="Author Id"/>
                    </Form.Group>

                    <Form.Group controlId="Author_First_Name">
                        <Form.Label>Author First Name</Form.Label>
                        <Form.Control type="text" name="Author_First_Name" required 
                        defaultValue={this.props.authfname}
                        placeholder="Author First Name"/>
                    </Form.Group>

                    <Form.Group controlId="Author_Last_Name">
                        <Form.Label>Author Last Name</Form.Label>
                        <Form.Control type="text" name="Author_Last_Name" required 
                        defaultValue={this.props.authlname}
                        placeholder="Author Last Name"/>
                    </Form.Group>

                    <Form.Group controlId="Author_Alias">
                        <Form.Label>Author Alias</Form.Label>
                        <Form.Control type="text" name="Author_Alias" required 
                        defaultValue={this.props.authalias}
                        placeholder="Author Alias"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Author
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