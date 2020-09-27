import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function EditExercise(props) {
  const [userName, setUserName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('/exercises/' + props.match.params.id)
      .then((res) => {
        setUserName(res.data.username)
        setDescription(res.data.description)
        setDuration(res.data.duration)
        setDate(new Date(res.data.date))
      })
      .catch((e) => {
        console.log('Error: ' + e)
      })

    axios.get('/users/').then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username))
        setUserName(response.data[0].username)
      }
    })
  })

  const onSubmit = (e) => {
    e.preventDefault()

    const exercise = {
      username: userName,
      description: description,
      duration: duration,
      date: date
    }
    console.log(exercise)

    axios
      .post('/exercises/update/' + props.match.params.id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log('Error: ' + err))

    window.location = '/'
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          >
            {users.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(e) => setDate(e)} />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise
