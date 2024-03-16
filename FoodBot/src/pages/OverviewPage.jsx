import React from 'react';

const InfoCard = ({ title, value, icon, color }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 ${color}`}>
      <div className="flex items-center">
        {icon && <div className="p-2 rounded-full bg-white mr-4">{icon}</div>}
        <div>
          <div className="text-sm">{title}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};

const CustomerRow = ({ name, phone, bill, status }) => {
  const statusSymbol = status === 'complete' ? '✅' : '⏳';
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statusSymbol}</td>
    </tr>
  );
};

const OverviewPage = () => {
  const customers = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    name: `Customer ${index + 1}`,
    phone: `123-456-${String(index).padStart(4, '0')}`,
    bill: `$${(100 + index * 5).toFixed(2)}`,
    status: index % 3 === 0 ? 'complete' : 'pending',
  }));

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InfoCard title="SALES" value="$24k" color="bg-white" />
        <InfoCard title="TOTAL CUSTOMERS" value="15" color="bg-white" />
        <InfoCard title="TASK PROGRESS" value="75.5%" color="bg-white" />
        <InfoCard title="TOTAL PROFIT" value="$15k" color="bg-white" />
      </div>
      <div className="flex flex-col mt-8">
        <h2 className="text-xl font-semibold mb-4">Customer List</h2>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  name={customer.name}
                  phone={customer.phone}
                  bill={customer.bill}
                  status={customer.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
