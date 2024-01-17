// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-black bg-opacity-80">
            <div className="absolute top-[40%] right-[50%] bg-black p-4 rounded-lg z-10 text-right border border-pink-500">
              <button
                className="text-white font-semibold hover:text-gray-500 focus:outline:none mr-2"
                onClick={onClose}
              >
                {" "}
                X{" "}
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
