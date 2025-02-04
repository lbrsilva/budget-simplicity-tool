import { FinanceCard } from "@/components/FinanceCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <FinanceCard title="Total de Receitas" value={0} />
        <FinanceCard title="Total de Despesas" value={0} isNegative />
        <FinanceCard title="Saldo" value={0} />
      </div>
    </div>
  );
};

export default Dashboard;