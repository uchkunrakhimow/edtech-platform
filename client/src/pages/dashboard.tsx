const Dashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Total Courses</h2>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Active Sessions</h2>
          <p className="text-3xl font-bold">187</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
