// CreatePet needs to render a form
// that form should build a pet object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new pet show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import PetForm from '../shared/PetForm'
import { createPet } from '../../api/pets'
// in order to navigate we want to use react router
import { useNavigate } from 'react-router-dom'

import { createPetSuccess, createPetFailure } from '../shared/AutoDismissAlert/messages'

const CreatePet = (props) => {
    const { user, msgAlert } = props

    const navigate = useNavigate()

    // we need a state to update to create a pet
    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            // going use updatedName and updatedValue to set our state as we type
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // we have number and boolean types in our form
            // which means we have to handle those accordingly

            // to handle a number, look at the type and parse the string into an integer
            if (e.target.type === 'number') {
                // handle number input
                updatedValue = parseInt(e.target.value)
            }

            // boolean is going to be handled by a checkbox
            // the default value of a checkbox is not a boolean(which is weird, bc that's what they're used for primarily)
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = {
                [updatedName]: updatedValue
            }

            console.log('the pet in the form', updatedPet)

            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log('the pet in submit', pet)
        createPet(user, pet)
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Ya!',
                    message: createPetSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createPetFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetForm
            pet={pet}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new pet!'
        />
    )
}

export default CreatePet