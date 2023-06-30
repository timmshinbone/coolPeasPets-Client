import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
// the api call we use to get a single pet from the db
import { getOnePet } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'

// we're going to use a combination of boostrap(react-bootstrap) and a styling object to style this component
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    // pull our props
    const { user, msgAlert } = props

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error finding pet',
                    message: messages.findPetFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if(!pet) {
        return <p>Loading...</p>
    }

    return (
        <Container className='m-2'>
            <Card>
                <Card.Header>{ pet.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Age: { pet.age }</small></div>
                        <div><small>Type: { pet.type }</small></div>
                        <div><small>
                            Adoptable: { pet.adoptable ? 'yes' : 'no'}    
                        </small></div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small>edit, delete, and give toy buttons go here</small>
                </Card.Footer>
            </Card>        
        </Container>
    )
}

export default ShowPet