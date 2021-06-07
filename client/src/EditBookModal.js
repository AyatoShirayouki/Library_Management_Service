import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditBookModal extends Component{
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
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Book_Id:event.target.Book_Id.value,
                Book_Title:event.target.Book_Title.value,
                Author_Id:event.target.Author_Id.value.split(' ').shift(),
                Pages:event.target.Pages.value,
                Publisher:event.target.Publisher.value,
                Publish_Date:event.target.Publish_Date.value,
                Language:event.target.Language.value,
                Book_Description:event.target.Book_Description.value,
                Photo_File_Name:this.photofilename

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
            Edit Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Book_Id">
                        <Form.Label>Book Id</Form.Label>
                        <Form.Control type="text" name="Book_Id" required 
                        placeholder="Book_Id"
                        disabled
                        defaultValue={this.props.bookid}/>
                    </Form.Group>

                    <Form.Group controlId="Book_Title">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" name="Book_Title" required 
                        defaultValue={this.props.booktitle}
                        placeholder="Book Title"/>
                    </Form.Group>

                    <Form.Group controlId="Author_Id">
                        <Form.Label>Author Id</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.authid}>
                        {this.state.deps.map(dep=>
                            <option key={dep.Author_Id}>{dep.Author_Id + ' ' 
                            + dep.Author_First_Name + ' '+ dep.Author_Last_Name}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Pages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control type="text" name="Pages" required 
                        defaultValue={this.props.pages}
                        placeholder="Pages"/>
                    </Form.Group>

                    <Form.Group controlId="Publisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control type="text" name="Publisher" required 
                        defaultValue={this.props.publisher}
                        placeholder="Publisher"/>
                    </Form.Group>

                    <Form.Group controlId="Publish_Date">
                        <Form.Label>Publish_Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Publish_Date"
                        required
                        placeholder="Publish Date"
                        defaultValue={this.props.publishdate}
                        />
                    </Form.Group>

                    <Form.Group controlId="Language">
                        <Form.Label>Language</Form.Label>
                        <Form.Control type="text" name="Language" required 
                        defaultValue={this.props.language}
                        placeholder="Language"/>
                    </Form.Group>

                    <Form.Group controlId="Book_Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="Book_Description" required 
                        defaultValue={this.props.bookdesc}
                        placeholder="Book Description"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
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