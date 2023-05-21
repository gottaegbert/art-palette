function Profile() {
  return (
    <img
      src="./palette_demo_example.jpg"
      alt="test"
    />
  );
}
const img = new Image();
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const data = canvasContext.getImageData(0, 0, canvas.width, canvas.height).data;
// const paletteExtractor = new PaletteExtractor();


export default function Gallery() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    <section>
      <h1 className='image'>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
      </header>
    </div>
    
  );
}
