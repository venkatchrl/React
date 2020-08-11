import * as ActionTypes from "./ActionTypes";
import { baseUrl } from '../shared/baseUrl';

// Adding Comment
export const addComment = ( comment ) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        comment: comment
    }
})

// Posting Comments to server
export const postComment = (dishId, rating, author, comment ) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString()

    return fetch( baseUrl + 'comments', {
        method : "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        Credential: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>  {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message)
     alert('Your comment could not be posted\nError: '+error.message);
    })
}

// Fetching Dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch( baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error =>  {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmess
})

export const addDishes = (dishes) => ({
  type : ActionTypes.ADD_DISHES,
  payload : dishes
})

// Fetching Comments
export const fetchComments = () => (dispatch) => {
    return fetch( baseUrl + 'comments')
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>  {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type : ActionTypes.COMMENTS_FAILED, 
    payload : errmess
})

export const addComments = (comments) => ({
  type : ActionTypes.ADD_COMMENTS,
  payload : comments
})

// Fetching Promotions
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch( baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>  {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errmess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errmess
})

export const addPromos = (promos) => ({
  type : ActionTypes.ADD_PROMOS,
  payload : promos
})

// Fetching Leaders
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload : leaders
})

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED ,
    payload: errmess
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch( baseUrl + 'leaders' )
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error( 'Error' + response.status + ':' + response.statusText );
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })

    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

// Posting Feedback to server
export const postFeedback = (firstname, lastname, tel, email, agree, contactType, message ) => (dispatch) => {
    const newFeedback = {
        firstname : firstname,
        lastname : lastname,
        tel : tel,
        email : email,
        agree : agree,
        contactType : contactType,
        message : message
    }
    newFeedback.date = new Date().toISOString()

    return fetch( baseUrl + 'feedback', {
        method : "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        Credential: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>  {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => {response.json()
        alert("Thank you for your feedback!" + JSON.stringify(newFeedback))})
    .catch(error =>  { console.log('post comments', error.message)
     alert('Your comment could not be posted\nError: '+error.message);})
}