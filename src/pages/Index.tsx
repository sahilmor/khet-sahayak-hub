const Index = () => {
  console.log('Index component rendering...');
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">FasalGuru</h1>
        <p className="text-xl text-muted-foreground">
          Help for your crops, right when you need it
        </p>
      </div>
    </div>
  );
};

export default Index;