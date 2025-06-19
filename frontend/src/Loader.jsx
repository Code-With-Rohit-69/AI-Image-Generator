import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ClipLoader color="#3b82f6" size={50} />
    </div>
  );
};

export default Loader;
