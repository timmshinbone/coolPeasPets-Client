import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
// the api call we use to get a single pet from the db
import { getOnePet, updatePet, removePet } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'
import EditPetModal from './EditPetModal'

// we're going to use a combination of boostrap(react-bootstrap) and a styling object to style this component
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    // handles showing the edit modal
    const [editModalShow, setEditModalShow] = useState(false)
    // this is going to handle our refresh of this component
    const [updated, setUpdated] = useState(false)

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
    }, [updated])

    const setPetFree = () => {
        // console.log('the pet in submit', pet)
        removePet(user, pet)
            .then(() => {
                msgAlert({
                    heading: 'Oh Ya!',
                    message: messages.deletePetSuccess,
                    variant: 'success'
                })
            })
            // when we delete we will navigate back to the index
            .then(() => {navigate('/')})
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.deletePetFailure,
                    variant: 'danger'
                })
            })
    }

    if(!pet) {
        return <p>Loading...</p>
    }

    return (
        <>
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
                    {
                        pet.owner && user && pet.owner._id === user._id
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                                >
                                Edit {pet.name}
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => setPetFree()}
                            >
                                Set {pet.name} Free
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>        
        </Container>
        <EditPetModal 
            user={user}
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            updatePet={updatePet}
            msgAlert={msgAlert}
            pet={pet}
            triggerRefresh={() => setUpdated(prev => !prev)}
        />
        </>
    )
}

export default ShowPet