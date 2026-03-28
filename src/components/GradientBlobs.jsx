const GradientBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 animate-blob-1 blur-[100px]"
        style={{ background: 'var(--blob-purple)' }}
      />
      <div
        className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 animate-blob-2 blur-[100px]"
        style={{ background: 'var(--blob-blue)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full opacity-15 animate-blob-3 blur-[100px]"
        style={{ background: 'var(--blob-pink)' }}
      />
    </div>
  );
};

export default GradientBlobs;
