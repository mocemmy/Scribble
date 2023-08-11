const GET_REVIEW_INFORMATION = "reviews/GET_REVIEW_INFORMATION"
const GET_REVIEWS = "reviews/GET_REVIEWS"
const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW"

const actionGetReviewInfo = (reviewInfo) => ({
    type: GET_REVIEW_INFORMATION,
    reviewInfo
})

const actionGetReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const actionGetSingleReview = (review) => ({
    type: GET_SINGLE_REVIEW,
    review
})

export const thunkGetReviewInfo = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/review-information`)

    if(response.ok) {
        const data = await response.json()
        dispatch(actionGetReviewInfo(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkGetSingleReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetSingleReview(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkGetReviews = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/reviews`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetReviews(data.reviews))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkCreateReview = (data, bookId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            review_body: data.review_body,
            review_stars: data.review_stars,
            user_id: parseInt(data.user_id),
            book_id: parseInt(data.book_id)
        })

    })
   
    if(response.ok){
        const data = await response.json();
        dispatch(thunkGetReviews(bookId))
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

export const thunkEditReview = (data, reviewId, bookId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            review_body: data.review_body,
            review_stars: data.review_stars,
            user_id: parseInt(data.user_id),
            book_id: parseInt(data.book_id)
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetReviews(bookId))
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

export const thunkDeleteReview = (reviewId, bookId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: "DELETE"
    })

    if(response.ok){
        dispatch(thunkGetReviews(bookId))
    } else {
        const errors = await response.json()
        return errors
    }
}



const initialState = {AllReviews: null, ReviewInformation: null, SingleReview: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_REVIEW_INFORMATION:
            newState = {...state, ReviewInformation: {}}
            newState.ReviewInformation = action.reviewInfo
            return newState;
        case GET_REVIEWS:
            newState = {...state, AllReviews: {}}
            action.reviews.forEach(review => newState.AllReviews[review.id] = review)
            return newState;
        case GET_SINGLE_REVIEW:
            newState = {...state, SingleReview: {}}
            newState.SingleReview = action.review
            return newState;
        default: 
            return state;
    }
}