import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Exercise from './Exercise'

function ExerciseList() {
  const [exercise, setExercise] = useState([])

  useEffect(() => {
    async function getExercise() {
      await axios
        .get('/exercises/')
        .then((response) => {
          setExercise(response.data)
        })
        .catch((err) => {
          console.log('Error: ' + err)
        })
    }
    getExercise()
  }, [exercise])

  const deleteExercise = (id) => {
    axios.delete('/exercises/' + id).then((res) => console.log(res.data))
    setExercise(exercise.filter((el) => el._id !== id))
  }

  const exerciseList = () => {
    return exercise.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={(e) => deleteExercise(e)}
          key={currentexercise._id}
        />
      )
    })
  }

  return (
    <div>
      <h3>Logged Exercise</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="thead-light">{exerciseList()}</tbody>
      </table>
    </div>
  )
}

export default ExerciseList
