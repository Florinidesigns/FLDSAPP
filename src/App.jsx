import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ABCFilterProvider } from './context/ABCFilterContext'
import Loginpage from './components/Loginpage'
import DashboardsPage from './components/DashboardsPage'
import VendasPage from './components/pages/VendasPage'
import ComprasPage from './components/pages/ComprasPage'
import ClientesPage from './components/pages/ClientesPage'
import FornecedoresPage from './components/pages/FornecedoresPage'
import ArtigosPage from './components/pages/ArtigosPage'
import RentabilidadePage from './components/pages/RentabilidadePage'
import VisaoGeralPage from './components/pages/VisaoGeralPage'

function App() {
  return (
    <BrowserRouter>
      <ABCFilterProvider>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/dashboards" element={<DashboardsPage />} />
          <Route path="/vendas" element={<VendasPage />} />
          <Route path="/compras" element={<ComprasPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/fornecedores" element={<FornecedoresPage />} />
          <Route path="/artigos" element={<ArtigosPage />} />
          <Route path="/rentabilidade" element={<RentabilidadePage />} />
          <Route path="/visaogeral" element={<VisaoGeralPage />} />
        </Routes>
      </ABCFilterProvider>
    </BrowserRouter>
  )
}

export default App
