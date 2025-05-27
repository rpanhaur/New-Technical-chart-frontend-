const ContentPageHead = () => {
  const today = new Date();

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-indigo-700">Today's Technical Chart</h1>
      <p className="text-purple-800 text-lg font-bold mt-2">Fill in the details below</p>
      <p className="mt-1 text-lg font-bold text-emerald-600">{formattedDate}</p>
    </div>
  );
};

export default ContentPageHead;
