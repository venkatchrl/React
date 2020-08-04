import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
   Button, Modal, ModalHeader, ModalBody, Row, Label, Input, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      isModalOpen : false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen : !this.state.isModalOpen
    })
  }
  
  handleSubmit(values){
    console.log("Current State : " + JSON.stringify(values));
    alert("Current State : "+ JSON.stringify(values));
  }

  render(){
    return(
      <div>
        <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
               <Row className="form-group">
                  <Label htmlFor="rating" md={12}>Rating</Label>
                  <Col>
                    <Input className="custom-select" type="select" name="select" id="select" >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="yourname" md={12}>Your Name</Label>
                  <Col>
                    <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Your Name" 
                      className="form-control"
                      validators ={{
                        required, minLength : minLength(3), maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                     />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={12}>Comment</Label>
                  <Col>
                    <Control.textarea model=".comment" id="comment" name="comment" rows="5" 
                      className="form-control"
                    />
                  </Col>
              </Row>  
              <Row className="form-group">
                <Col >
                  <Button type="submit" color="primary" >Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

  function DishDetail(props){
    if(props.dish == null){
        return (
          <div></div>
        )
      }
    else{
      return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><a href="/menu">Menu</a></BreadcrumbItem>
                    <BreadcrumbItem active><a>{props.dish.name}</a></BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish}/>
              <RenderComments comments={props.comments}/>
            </div>
        </div>
        )
      }
  }

function RenderDish({dish}) {
      if (dish != null)
          return(
            <div className="col-12 col-md-5 m-1">
              <Card >
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
            </div>
          );
      else
          return(
              <div></div>
          );
  }

  function RenderComments({comments}){

    const cmnts = comments.map((comment) => {

      if(comments == null){
        return (
          <div></div>
        )
      }

      else
        return(
          <ul className="list-unstyled">
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
          </ul>
        )
    })
    return(
      <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {cmnts}
          <div>
            <CommentForm />
          </div>
      </div>
    )
  }


  export default DishDetail;
