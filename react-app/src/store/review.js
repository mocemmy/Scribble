const GET_REVIEW_INFORMATION = "reviews/GET_REVIEW_INFORMATION"
const GET_REVIEWS = "reviews/GET_REVIEWS"

const actionGetReviewInfo = (reviewInfo) => ({
    type: GET_REVIEW_INFORMATION,
    reviewInfo
})

const actionGetReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
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
		body: JSON.stringify(data)

    })
    console.log('here')
    if(response.ok){
        const data = await response.json();
        dispatch(thunkGetReviews(bookId))
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

const initialState = {AllReviews: null, ReviewInformation: null}

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
        default: 
            return state;
    }
}