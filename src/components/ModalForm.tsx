import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

export function formatDate(str: string) {
  const date = new Date(str);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export function formatCurrency(value: string) {
  const cleaned = value.replace(/\D/g, '');
  const number = parseFloat(cleaned) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

const ModalForm = ({
  showForm,
  setShowForm,
  selectedItem,
  saveChanges,
}: {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  selectedItem: any;
  saveChanges: (values: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (

    <Modal show={showForm} onHide={() => setShowForm(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editando Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedItem && (
          <Formik
            initialValues={{
              id: selectedItem.id,
              date: selectedItem.dataCadastro,
              amount: formatCurrency(selectedItem.valor.toString()),
              phone: formatPhone(selectedItem.telefone),
            }}
            onSubmit={async (values) => {
              setIsLoading(true);
              const unmaskedValues = {
                ...values,
                amount: parseFloat(values.amount.replace(/\D/g, '')) / 100,
                phone: values.phone.replace(/\D/g, ''),
              };
              await saveChanges(unmaskedValues);
              setIsLoading(false);
            }}
            enableReinitialize
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <Field
                      type="text"
                      name="id"
                      disabled
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Data de Cadastro</label>
                    <Field
                      type="text"
                      name="date"
                      disabled
                      value={formatDate(values.date)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Valor (R$)</label>
                    <input
                      name="amount"
                      value={values.amount}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        const formatted = formatCurrency(raw);
                        setFieldValue('amount', formatted);
                      }}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        const formatted = formatPhone(raw);
                        setFieldValue('phone', formatted);
                      }}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4 w-full">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primaryLight hover:bg-primaryDark"
                    disabled={isLoading}
                  >
                    Alterar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
