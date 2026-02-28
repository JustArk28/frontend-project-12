import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import init from './init'

const app = async () => {
  createRoot(document.getElementById('root')).render(await init())
}

app()
