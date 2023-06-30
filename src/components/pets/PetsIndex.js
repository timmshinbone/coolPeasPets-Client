// retrieving and displaying a list of ALL the pets in the database, no matter who the owner is.

// import dependicies to build this component
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
// eventually we'll have a loading screen we can use anywhere

// build and import api function calls
import { getAllPets } from '../../api/pets'

// we might also want to use custom messages, to save space in this component
import messages from '../shared/AutoDismissAlert/messages'

// we're going to use a combination of boostrap(react-bootstrap) and a styling object to style this component
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet
const PetsIndex = (props) => {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)
    // pull the msgAlert from props so we can use it
    const { msgAlert } = props

    // get our pets from the database(via an api call)
    useEffect(() => {
        getAllPets()
            .then(res => setPets(res.data.pets))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Pets',
                    message: 'could not get pets at this time',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if there is an error do this:
    if (error) {
        return <p>Error!</p>
    }

    // if we dont have any pets, show this:
    if (!pets) {
        return <p>Loading...</p>
    } else if (pets.length === 0) {
        return <p>No pets yet, go add some!</p>
    }

    // once we have pets display them as cards
    // iterate over the pets array, and produce a card for each one
    const petCards = pets.map(pet => (
        <Card key={ pet.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ pet.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/pets/${pet.id}`}> View {pet.name} </Link>
                </Card.Text>
                { pet.owner ?
                  <Card.Footer>owner: {pet.owner.email}</Card.Footer>
                  :
                  null
                }
            </Card.Body>
        </Card>
    ))

    // all function components must retrun jsx
    return (
        <div className='container-md' style={ cardContainerStyle }>
            {petCards}
        </div>
    )
}

export default PetsIndex