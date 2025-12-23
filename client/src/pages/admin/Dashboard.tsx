import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-xl ${color} text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Обзор системы</h1>
        <p className="text-gray-500">
          Добро пожаловать в панель управления Lehrer KG
        </p>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Всего учеников"
          value="1,234"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Активные курсы"
          value="42"
          icon={BookOpen}
          color="bg-purple-500"
        />
        <StatCard
          title="Выручка (мес)"
          value="$12,500"
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Активность"
          value="+18%"
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      {/* Пример контента */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
        График активности будет здесь...
      </div>
    </div>
  );
};

export default Dashboard;
