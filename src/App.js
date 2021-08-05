import './App.css';
import useScrollContainer from './useScrollContainer'

function App() {
  
  const {
    container1,
    container2,
    container3,
    content1,
    content2,
    content3
  } = useScrollContainer()

  return (
    <div className="container1" ref={container1}>
      <div className="content1" ref={content1}>
        <div className="container2" ref={container2}>
          <div className="content2" ref={content2}>
            <div>content2 start</div>
            <div>content2 end</div>
          </div>
        </div>
        <div className="container3" ref={container3}>
          <div className="content3"  ref={content3}>
            <div>content3 start</div>
            <div>content3 end</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
