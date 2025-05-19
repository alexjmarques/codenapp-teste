import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import ModalForm, { formatCurrency, formatDate, formatPhone } from './components/ModalForm';

interface Item {
  id: number;
  dataCadastro: string;
  valor: number;
  telefone: string;
  permiteEdicao: boolean;
}

interface FormValues {
  id: number;
  date: string;
  amount: string;
  phone: string;
}

function App() {


  const [itensTabela, setItensTabela] = useState([
    {
      id: 1,
      dataCadastro: "2020-12-01",
      valor: 34.5,
      telefone: "27998874625",
      permiteEdicao: false
    },
    {
      id: 2,
      dataCadastro: "2020-12-04",
      valor: 31.56,
      telefone: "27998534625",
      permiteEdicao: true
    },
    {
      id: 3,
      dataCadastro: "2021-01-23",
      valor: 124.1,
      telefone: "32998544641",
      permiteEdicao: true
    },
    {
      id: 4,
      dataCadastro: "2021-04-18",
      valor: 242.99,
      telefone: "2733199546",
      permiteEdicao: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openEditForm = (item: Item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const saveChanges = async (values: FormValues) => {
    setIsLoading(true);
    const updated = itensTabela.map((item) =>
      item.id === values.id
        ? { ...item, valor: parseFloat(values.amount), telefone: values.phone }
        : item
    );
    setItensTabela(updated);
    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto w-2/3 p-4 flex flex-col items-center">
      <ModalForm
        showForm={showForm}
        setShowForm={setShowForm}
        selectedItem={selectedItem}
        saveChanges={saveChanges}
      />

      <table className="w-full text-left rounded-2xl shadow border border-gray-200 overflow-hidden">
        <thead className="bg-[#F3F3F3] text-sm">
          <tr>
            <th className="px-4 py-3 font-semibold text-primaryDark text-base">ID</th>
            <th className="px-4 py-3 font-semibold text-primaryDark text-base">Data de Cadastro</th>
            <th className="px-4 py-3 font-semibold text-primaryDark text-base">Valor (R$)</th>
            <th className="px-4 py-3 font-semibold text-primaryDark text-base">Telefone</th>
            <th className="px-4 py-3 font-semibold text-primaryDark text-base">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itensTabela.map((item, index) => (
            <tr key={item.id}>
              <td className="border-t border-gray-200 text-sm p-2 text-center">{item.id}</td>
              <td className="border-t border-gray-200 text-sm p-2 px-4 py-3">{formatDate(item.dataCadastro)}</td>
                <td className="border-t border-gray-200 text-sm p-2 px-4 py-3">{formatCurrency(item.valor.toString())}</td>
                <td className="border-t border-gray-200 text-sm p-2 px-4 py-3">{formatPhone(item.telefone)}</td>
              <td className="border-t border-gray-200 text-sm p-2 px-4 py-3">
                {item.permiteEdicao && (
                  <button
                    className="bg-primaryLight text-white px-3 py-1 rounded-md"
                    onClick={() => openEditForm(item)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className="spinner-border" />}
    </div>
  );
}

export default App;
