import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

const UserList = () => {
  const { data, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you Sure? ")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      toast.success("Successfully Edited");

      setEditableUserId(null);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold text-white ml-[10rem]">
        Users
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* AdminMenu */}
          <table className="w-full mx-auto md:w-4/5">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-white">ID</th>
                <th className="px-4 py-2 text-left text-white">Name</th>
                <th className="px-4 py-2 text-left text-white">Email</th>
                <th className="px-4 py-2 text-left text-white">Admin</th>
                <th className="px-4 py-2 text-left text-white"></th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-white">{user._id}</td>
                  <td className="px-4 py-2 text-white">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-neutral-800"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-white">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-neutral-800"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.email}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-white">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2 text-white">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-950"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
