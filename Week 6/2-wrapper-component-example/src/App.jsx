import "./App.css";

function App() {
  return (
    <div>
      <CardWrapper>
        <SomeComponent />
      </CardWrapper>
      
      <CardWrapper>
        <SomeComponent />
      </CardWrapper>
    </div>
  );
}

function SomeComponent() {
  return (
    <div>
      <h1>This is a test component</h1>
    </div>
  );
}

function CardWrapper({ children }) {
  return <div className="main-div">{children}</div>;
}

export default App;
