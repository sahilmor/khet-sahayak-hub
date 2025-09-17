console.log('App.tsx loading...');

const App = () => {
  console.log('App component rendering...');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2d5a3d' }}>FasalGuru</h1>
      <p style={{ color: '#666' }}>Help for your crops, right when you need it</p>
      <p style={{ marginTop: '20px' }}>App is loading successfully!</p>
    </div>
  );
};

export default App;