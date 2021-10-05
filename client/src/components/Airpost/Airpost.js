import React, {useState, useEffect, Fragment} from 'react';
import Header from './Header'
import axios from 'axios';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';

const Wrapper = styled.div `
margin-left: auto;
margin-right: auto;
display: grid;
grid-template-columns: repeat(2, 1fr);`

const Column = styled.div `
    background: #fff;
    height: 100vh;
    overflow: scroll;

    &:last-child {
        background: #000;
    }
`
const Main = styled.div `
    padding-left: 50px;
`

const Airpost = (props) => {
    const [review, setReview] = useState([]);
    const [airpost, setAirpost] =useState([]);
    const [loaded, setLoaded] = useState(false);
    // let history = useHistory();
    
    useEffect(()=>{
        const slug = props.match.params.slug
        const url = `/api/v1/airposts/${slug}`

        axios.get(url)
        .then(resp => {    
            setAirpost(resp.data)
            setLoaded(true)
        })
        .catch(resp => console.log(resp))
    }, [])
    {console.log(airpost)}

    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, {[e.target]: e.target.value}))
        console.log('review:', review)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const csrfToken = document.querySelector('[name=csrf-token]').content
        // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const airpost_id = airpost.data.id 
        axios.post(`/api/v1/reviews`, {review, airpost_id})
        .then (resp => {
            const included = [...airpost.included, resp.data.data]
            setAirpost({...airpost, included})
            setReview({title: '', description: '', score: 0})
        })
        .catch(resp => {})
    }
    return (
        <Wrapper>
           {
            loaded &&
                <Fragment>
                    <Column>
                        <Main>
                            <Header 
                                attributes={airpost.data.attributes}
                                reviews={airpost.included}
                            />
                            <div className="reviews"></div>
                        </Main>
                    </Column>
                    <Column>
                        <ReviewForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        attributes={airpost.data.attributes}
                        review={review}
                        />
                    </Column>
                </Fragment>
            }
           
        </Wrapper>
    )
}
export default Airpost

