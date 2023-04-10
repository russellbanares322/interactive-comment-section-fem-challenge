import Home from "./pages/home/Home";

function App() {
  return (
    <div className="font-rubik bg-light-gray flex flex-col justify-center items-center h-full w-full py-4 px-4 md:px-10">
      <div className="h-full w-full md:w-[39rem]">
        <Home />
      </div>
    </div>
  );
}

export default App;
