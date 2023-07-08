import { Navigate, NavLink, Outlet, useParams, useRoutes } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <NavLink to="/users">Users list</NavLink>
    </>
  )
}

const UsersListPage = () => {
  return (
    <>
      <h1>Users list page</h1>
      <NavLink to="/">Home</NavLink>
      <ul>
        {new Array(5).fill('').map((_, i) => (
          <li key={i}>
            <NavLink to={`${i}`}>User {i}</NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

const UserProfilePage = () => {
  const { userId } = useParams()
  return (
    <>
      <h1>User profile page</h1>
      <NavLink to="/users">Users list</NavLink>
      <p>userId: {userId}</p>
      <NavLink to={`/users/${userId}/edit`}>edit</NavLink>
    </>
  )
}

const UserEditPage = () => {
  const { userId } = useParams()
  const randomId = Math.floor(Math.random() * 100)
  return (
    <>
      <h1>User edit page</h1>
      <ul>
        <li>
          <NavLink to={`/users/${userId}/profile`}>go to user</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${randomId}/profile`}>go to another user</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users list page</NavLink>
        </li>
      </ul>
    </>
  )
}


const UsersLayout = () => {
  return (
    <>
      <h1>Users layout</h1>
      <Outlet/>
    </>
  )
}

function App() {
  const routes = useRoutes([
    { path: '/', element: <HomePage/> },
    {
      path: 'users/*', element: <UsersLayout/>, children: [
        { path: '', element: <UsersListPage/> },
        { path: ':userId/profile', element: <UserProfilePage/> },
        { path: ':userId/edit', element: <UserEditPage/> },
        { path: ':userId/*', element: <Navigate to="profile"/> },
      ]
    },
    { path: '*', element: <Navigate to="/"/> }
  ])
  return (
    <div>
      <h1>App layout</h1>
      {routes}
    </div>
  )
}

export default App
