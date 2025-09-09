
import ErrorBoundary from './components/ErrorBoundary'
import './styles/forms.css'
import './App.css'
import AppRoutes from "./components/AppRoutes.jsx";






function App() {
    return (
        <ErrorBoundary>
            <AppRoutes/>
        </ErrorBoundary>
    )
}

export default App