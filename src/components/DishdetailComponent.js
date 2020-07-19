import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


  function DishDetail(props){
    if(props.dish == null){
        return (
          <div></div>
        )
      }
    else{
      return(
        <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.dish.comments}/>
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

      var date = new Date(comment.date);
      const m = date.toLocaleString('default',{ month: 'short' });
      const d = date.getDate();
      const y = date.getFullYear();

        return(
          <li className="list-unstyled" key={comment.id}>
              <p>{comment.comment}</p>
              <p>--{comment.author}, {m} {d}, {y}</p>
          </li>
        )
    })
    return(
      <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {cmnts}
      </div>
    )
  }


  export default DishDetail;
