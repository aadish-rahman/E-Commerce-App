import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  console.log(categories);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
      setName("");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category Name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: { name: updatingName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setUpdatingName("");
        toast.success(`${result.name} is updated.`);
        refetch();
        setModalVisible(false);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Updating category failed, try again.");
      setUpdatingName("");
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setModalVisible(false);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Deleting category failed, try again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* {AdminMenu} */}
      <div className="p-3 md:w-3/4 ">
        <div className="h-12 ml-[1rem] text-2xl">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="border border-pink-500 rounded-lg px-4 py-2 m-3 text-pink-500 bg-neutral-850 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
