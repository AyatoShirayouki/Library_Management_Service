import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBookModal} from './AddBookModal';
import {EditBookModal} from './EditBookModal';

export class Book extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'book/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, bookid,booktitle,authid,authfname,authlname,pages,publisher,publishdate,language,bookdesc,photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Book Title</th>
                            <th>Author First Name</th>
                            <th>Author Last Name</th>
                            <th>Author Alias</th>
                            <th>Pages</th>
                            <th>Publisher</th>
                            <th>Publish Date</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.Book_Id}>
                                <td>{emp.Book_Id}</td>
                                <td>{emp.Book_Title}</td>
                                <td>{emp.Author_First_Name}</td>
                                <td>{emp.Author_Last_Name}</td>
                                <td>{emp.Author_Alias}</td>
                                <td>{emp.Pages}</td>
                                <td>{emp.Publisher}</td>
                                <td>{emp.Publish_Date}</td>
                                <td>{emp.Language}</td>
                                <td>{emp.Book_Description}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        bookid:emp.Book_Id,booktitle:emp.Book_Title,authid:emp.Author_Id,
        pages:emp.Pages,publisher:emp.Publisher,
        language:emp.Language,bookdesc:emp.Book_Description,
        photofilename:emp.Photo_File_Name,publishdate:emp.Publish_Date,
        authfname:emp.Author_First_Name,authlname:emp.Author_Last_Name })}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.Book_Id)}>
            Delete
        </Button>

        <EditBookModal show={this.state.editModalShow}
        onHide={editModalClose}
        bookid={bookid}
        booktitle={booktitle}
        authid={authid}
        pages={pages}
        publisher={publisher}
        publishdate={publishdate}
        language={language}
        bookdesc={bookdesc}
        photofilename={photofilename}
        authfname={authfname}
        authlname={authlname}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Book</Button>

                    <AddBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}