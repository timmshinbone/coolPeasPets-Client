import { useState } from 'react'

import { Modal } from 'react-bootstrap'

import PetForm from '../shared/PetForm'

import { updatePetSuccess, updatePetFailure} from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props

    const [pet, setPet] = useState(props.pet)

    const onChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

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
        updatePet(user, pet)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Ya!',
                    message: updatePetSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowPet component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowPet) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePetFailure,
                    variant: 'danger'
                })
            })
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <PetForm 
                    pet={pet}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Pet"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal