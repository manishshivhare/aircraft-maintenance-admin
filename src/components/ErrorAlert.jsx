const ErrorAlert = ({ error, onDissmiss }) => {
  if (!error) return null;
  
  return (
    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
      {error}
      <button onClick={onDismiss} className="float-right font-bold">×</button>
    </div>
  );
};

export default ErrorAlert