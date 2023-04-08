import Comments from "./components/Comments";

function App() {
  return (
    <div className="font-rubik bg-light-gray flex flex-col justify-center items-center h-full w-full py-4 px-2 md:px-10">
      <div className="h-full w-full md:w-[39rem]">
        <Comments />
      </div>
    </div>
  );
}

export default App;
