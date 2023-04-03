import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import ListTodo from '../components/ListTodo'
import { Provider } from 'react-redux'
import {store} from '../redux/store'

export default function Home() {
  
  return (
    <Provider store={store}>      
      <div className="container">
        <Head>
          <title>Todo App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container">
          <ListTodo/>
        </main>

        <footer className="footer mx-auto">
        
        </footer>
      
      </div>
     
    </Provider>
  )
}
