import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddIssueModal} from './AddIssueModal';
import {EditIssueModal} from './EditIssueModal';

export class Issue extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'issue')
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
            fetch(process.env.REACT_APP_API+'issue/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, bsid,bookid,booktitle,clientfname,clientlname,issuedate,duedate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Book Issue Id</th>
                            <th>Client First Name</th>
                            <th>Client Last Name</th>
                            <th>Book Name</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.Book_Issue_Id}>
                                <td>{emp.Book_Issue_Id}</td>
                                <td>{emp.Book_Title}</td>
                                <td>{emp.Client_First_Name}</td>
                                <td>{emp.Client_Last_Name}</td>
                                <td>{emp.Issue_Date}</td>
                                <td>{emp.Due_Date}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        bsid:emp.Book_Issue_Id,bookid:emp.Book_Id,booktitle:emp.Book_Title,clientfname:emp.Client_First_Name,
        clientlname:emp.Client_Last_Name,
        issuedate:emp.Issue_Date,duedate:emp.Due_Date})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.Book_Issue_Id)}>
            Delete
        </Button>

        <EditIssueModal show={this.state.editModalShow}
        onHide={editModalClose}
        bsid={bsid}
        bookid={bookid}
        booktitle={booktitle}
        clientfname={clientfname}
        clientlname={clientlname}
        issuedate={issuedate}
        duedate={duedate}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Issue</Button>

                    <AddIssueModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}