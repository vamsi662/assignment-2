import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    showPassword: false,
    passwordsList: [],
    searchInput: '',
    website: '',
    username: '',
    password: '',
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {id: v4(), website, username, password}
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      username: '',
      website: '',
      password: '',
    }))
  }

  onWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const deleteIndex = passwordsList.findIndex(
      eachPassword => eachPassword.id === id,
    )
    passwordsList.splice(deleteIndex, 1)
    this.setState({passwordsList: [...passwordsList]})
  }

  render() {
    const {
      showPassword,
      passwordsList,
      searchInput,
      website,
      username,
      password,
    } = this.state
    const filteredPasswordList =
      passwordsList.length !== 0
        ? passwordsList.filter(eachPassword =>
            eachPassword.website
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
          )
        : []
    console.log(filteredPasswordList)
    console.log(username, website, password)
    const noOfPasswords = filteredPasswordList.length
    return (
      <div className="bg-con">
        <div className="main-con">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              className="logo"
              alt="app logo"
            />
          </div>
          <div className="add-password-con">
            <div className="con">
              <h1 className="add-password-heading">Add New Password</h1>
              <form className="form-con" onSubmit={this.onAddPassword}>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      className="website-image"
                      alt="website"
                    />
                  </div>
                  <hr className="separator" />
                  <input
                    value={website}
                    type="text"
                    className="input"
                    onChange={this.onWebsiteInput}
                    placeholder="Enter Website"
                  />
                </div>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      className="website-image"
                      alt="username"
                    />
                  </div>
                  <hr className="separator" />
                  <input
                    value={username}
                    type="text"
                    className="input"
                    onChange={this.onUsernameInput}
                    placeholder="Enter Username"
                  />
                </div>
                <div className="input-con">
                  <div className="img-con">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      className="website-image"
                      alt="password"
                    />
                  </div>
                  <hr className="separator" />
                  <input
                    value={password}
                    type="password"
                    className="input"
                    onChange={this.onPasswordInput}
                    placeholder="Enter Password"
                  />
                </div>
                <div className="add-btn-con">
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                className="password-manager-image"
                alt="password manager"
              />
            </div>
          </div>
          <div className="passwords-con">
            <div className="password-heading-search-con">
              <div className="passwords-count-con">
                <h1 className="your-password">Your Passwords</h1>
                <p className="password-count">{noOfPasswords}</p>
              </div>
              <div className="search-con">
                <div className="search-img-con">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    className="search-image"
                    alt="search"
                  />
                </div>
                <hr className="separator" />
                <input
                  value={searchInput}
                  type="search"
                  className="search"
                  onChange={this.onSearch}
                  placeholder="Search"
                />
              </div>
            </div>
            <hr className="password-separator" />
            <div className="checkbox-con">
              <input
                id="checkbox"
                type="checkbox"
                onClick={this.onShowPassword}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {noOfPasswords === 0 ? (
              <div className="no-password-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className="no-password-img"
                  alt="no passwords"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list">
                {filteredPasswordList.map(eachPassword => (
                  <li className="password-item" key={eachPassword.id}>
                    <div className="website-profile-pic">
                      {username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="website">{website}</p>
                      <p className="username">{username}</p>
                      {showPassword ? (
                        <p className="password">{password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          className="star-password"
                          alt="stars"
                        />
                      )}
                    </div>
                    <div>
                      <button
                        id={eachPassword.id}
                        type="button"
                        onClick={this.onDeletePassword}
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          className="delete-image"
                          alt="delete"
                          data-testid="delete"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
