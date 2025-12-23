import { useEffect, useState } from "react";
import { $api } from "@/shared/api/api";
import { Trash2, Shield, User as UserIcon } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await $api.get<User[]>("/users");
      setUsers(data);
    } catch (error) {
      console.error("Не удалось загрузить пользователей", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-8">Загрузка...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Пользователи ({users.length})
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-medium">Пользователь</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Роль</th>
              <th className="p-4 font-medium">Дата регистрации</th>
              <th className="p-4 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <UserIcon size={20} />
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-red-500 transition p-2">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
