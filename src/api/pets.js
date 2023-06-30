// this is where we store our api call functions
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show One Pet
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

// Create -> creates a pet
export const createPet = (user, newPet) => {
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet}
    })
}
// Update -> updates a pet
export const updatePet = (user, updatedPet) => {
    return axios({
        url: `${apiUrl}/pets/${updatedPet.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet}
    })
}
// Delete -> sets a pet free
export const removePet = (user, petToDelete) => {
    return axios({
        url: `${apiUrl}/pets/${petToDelete.id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}