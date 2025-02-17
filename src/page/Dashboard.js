import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  setSearchTerm 
} from "../features/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { users, loading, searchTerm } = useSelector((state) => state.users);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: { street: "", city: "" },
    company: { name: "" },
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser(newUser));
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      address: { street: "", city: "" },
      company: { name: "" },
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(selectedUser));
    setShowEditModal(false);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      dispatch(deleteUser(userId));
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-[3rem] w-[3rem] border-t-[0.125rem] border-b-[0.125rem] border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-[1.5rem]">
      {/* Modal Tambah Pengguna */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-[1.5rem] rounded-[0.5rem] w-[24rem]">
            <h3 className="text-[1.25rem] font-bold mb-[1rem]">Tambah Pengguna Baru</h3>
            <form onSubmit={handleAddUser}>
              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Nama</label>
                <input
                  type="text"
                  required
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Alamat</label>
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  placeholder="Jalan"
                  value={newUser.address.street}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      address: { ...newUser.address, street: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem] mt-[0.5rem]"
                  placeholder="Kota"
                  value={newUser.address.city}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      address: { ...newUser.address, city: e.target.value },
                    })
                  }
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">
                  Perusahaan
                </label>
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={newUser.company.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      company: { ...newUser.company, name: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-[0.5rem]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-[1rem] py-[0.5rem] text-gray-600 hover:bg-gray-100 rounded-[0.25rem]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-[1rem] py-[0.5rem] bg-[#3D8D7A] text-white rounded-[0.25rem] hover:bg-[#3c9782]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Pengguna */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-[1.5rem] rounded-[0.5rem] w-[24rem]">
            <h3 className="text-[1.25rem] font-bold mb-[1rem]">Edit Pengguna</h3>
            <form onSubmit={handleEditUser}>
              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Nama</label>
                <input
                  type="text"
                  required
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">Alamat</label>
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  placeholder="Jalan"
                  value={selectedUser.address.street}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: { ...selectedUser.address, street: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem] mt-[0.5rem]"
                  placeholder="Kota"
                  value={selectedUser.address.city}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: { ...selectedUser.address, city: e.target.value },
                    })
                  }
                />
              </div>

              <div className="mb-[1rem]">
                <label className="block text-[0.875rem] font-medium mb-[0.25rem]">
                  Perusahaan
                </label>
                <input
                  type="text"
                  className="w-full p-[0.5rem] border rounded-[0.25rem]"
                  value={selectedUser.company.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      company: { ...selectedUser.company, name: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-[0.5rem]">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-[1rem] py-[0.5rem] text-gray-600 hover:bg-gray-100 rounded-[0.25rem]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-[1rem] py-[0.5rem] 
                   text-white rounded-[0.25rem] hover:bg-indigo-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Utama dengan Fitur Pencarian */}
      <div className="bg-[#f0f7f5] rounded-[0.5rem] shadow-lg overflow-hidden">
        <div className="p-[1.5rem] border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-[1rem]">
          <h2 className="text-[1.5rem] font-bold text-[#2d6b5c]">Daftar Pengguna</h2>
          
          <div className="w-full md:max-w-[24rem]">
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau email..."
              className="w-full p-[0.5rem] border rounded-[0.25rem] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A]"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#3D8D7A] text-white px-[1rem] py-[0.5rem] rounded-[0.25rem] hover:bg-[#48a791] transition-colors w-full md:w-auto"
          >
            + Tambah Pengguna
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#3D8D7A]/20">
            <thead className="bg-[#3D8D7A]">
              <tr>
                <th className="px-[1.5rem] py-[0.75rem] text-left text-[0.75rem] font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-[1.5rem] py-[0.75rem] text-left text-[0.75rem] font-medium text-white uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-[1.5rem] py-[0.75rem] text-left text-[0.75rem] font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-[1.5rem] py-[0.75rem] text-left text-[0.75rem] font-medium text-white uppercase tracking-wider">
                  Perusahaan
                </th>
                <th className="px-[1.5rem] py-[0.75rem] text-left text-[0.75rem] font-medium text-white uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#f0f7f5] divide-y divide-[#3D8D7A]/20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#e0efe9]">
                  <td className="px-[1.5rem] py-[1rem] whitespace-nowrap text-[0.875rem] text-[#2d6b5c]">
                    {user.id}
                  </td>
                  <td className="px-[1.5rem] py-[1rem] whitespace-nowrap text-[0.875rem] text-[#2d6b5c]">
                    {user.name}
                  </td>
                  <td className="px-[1.5rem] py-[1rem] whitespace-nowrap text-[0.875rem] text-[#2d6b5c]">
                    {user.email}
                  </td>
                  <td className="px-[1.5rem] py-[1rem] whitespace-nowrap text-[0.875rem] text-[#2d6b5c]">
                    {user.company.name}
                  </td>
                  <td className="px-[1.5rem] py-[1rem] whitespace-nowrap text-[0.875rem] font-medium">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-[#3D8D7A] hover:text-[#2d6b5c] mr-[1rem]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-[#c44d4d] hover:text-[#a33939]"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-[1.5rem] text-center text-[#3D8D7A]">
              {users.length === 0 
                ? "Belum ada pengguna" 
                : "Tidak ditemukan pengguna yang cocok"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}