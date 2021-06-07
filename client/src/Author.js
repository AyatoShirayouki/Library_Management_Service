import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAuthModal} from './AddAuthModal';
import {EditAuthModal} from './EditAuthModal';

export class Author extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'author')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'author/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, authid,authfname,authlname,authalias}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Author Id</th>
                            <th>Author First Name</th>
                            <th>Author Last Name</th>
                            <th>Author Alias</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.Author_Id}>
                                <td>{dep.Author_Id}</td>
                                <td>{dep.Author_First_Name}</td>
                                <td>{dep.Author_Last_Name}</td>
                                <td>{dep.Author_Alias}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        authid:dep.Author_Id,authfname:dep.Author_First_Name,
        authlname:dep.Author_Last_Name,authalias:dep.Author_Alias})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(dep.Author_Id)}>
            Delete
        </Button>

        <EditAuthModal show={this.state.editModalShow}
        onHide={editModalClose}
        authid={authid}
        authfname={authfname}
        authlname={authlname}
        authalias={authalias}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Author</Button>

                    <AddAuthModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}