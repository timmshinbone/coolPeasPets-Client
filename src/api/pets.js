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

// Update -> updates a pet

// Delete -> sets a pet free