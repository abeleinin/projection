import { ChakraProvider } from '@chakra-ui/provider'
import Layout from '../components/layouts/main'
import { AuthProvider } from '../contexts/AuthContext'
import { DatabaseProvider } from '../contexts/DatabaseContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from '../lib/theme'
import Home from './index'
import Signup from './signup'
import Login from './login'

const Website = () => {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Layout>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path={'/signup'} element={<Signup />}></Route>
                <Route path={'/login'} element={<Login />}></Route>
              </Routes>
            </Layout>
          </Router>
        </ChakraProvider>
      </DatabaseProvider>
    </AuthProvider>
  )
}

export default Website
