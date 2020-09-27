import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
  const [userName, setUserName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      username: userName
    }
    console.log(user)
    axios
      .post('/users/add', user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log('Error: ' + err))

    setUserName('')
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateUser
