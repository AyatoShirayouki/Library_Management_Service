import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddBookModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'author')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'book',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Book_Title:event.target.Book_Title.value,
                Author_Id:event.target.Author_Id.value.split(' ').shift(),
                Pages:event.target.Pages.value,
                Publisher:event.target.Publisher.value,
                Publish_Date:event.target.Publish_Date.value,
                Language:event.target.Language.value,
                Book_Description:event.target.Book_Description.value,
                PhotoFileName:this.photofilename
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


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Book/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
            Add Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Book_Title">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" name="Book_Title" required 
                        placeholder="Book Title"/>
                    </Form.Group>

                    <Form.Group controlId="Author_Id">
                        <Form.Label>Author_Id</Form.Label>
                        <Form.Control as="select">
                        {this.state.deps.map(dep=>
                            <option key={dep.Author_Id}>{dep.Author_Id + ' ' + dep.Author_First_Name + ' '
                             + dep.Author_Last_Name}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Pages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control type="text" name="Pages" required 
                        placeholder="Pages"/>
                    </Form.Group>

                    <Form.Group controlId="Publisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control type="text" name="Publisher" required 
                        placeholder="Publisher"/>
                    </Form.Group>

                    <Form.Group controlId="Publish_Date">
                        <Form.Label>Publish Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Publish_Date"
                        required
                        placeholder="Publish Date"
                        />
                    </Form.Group>

                    <Form.Group controlId="Language">
                        <Form.Label>Language</Form.Label>
                        <Form.Control type="text" name="Language" required 
                        placeholder="Language"/>
                    </Form.Group>

                    <Form.Group controlId="Book_Description">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control type="text" as="textarea" rows={5} name="Book_Description" required 
                        placeholder="Book Description"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
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