import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fields from an API
  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/fields`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fields.");
        }
        const data = await response.json();

        // Map response to relevant data structure
        const formattedData = data.slice(0, 5).map((item) => ({
          _id: item.id.toString(),
          name: `Field ${item.id}`,
          cropType: item.title,
          areaSize: Math.floor(Math.random() * 100 + 1), // Random area size
          location: {
            latitude: Math.random() * 180 - 90,
            longitude: Math.random() * 360 - 180,
          },
        }));

        setFields(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const addField = () => {
    const newField = {
      _id: `${Date.now()}`,
      name: `New Field ${fields.length + 1}`,
      cropType: "Rice",
      areaSize: 20,
      location: { latitude: 42.125, longitude: -71.458 },
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  const updateField = (id, updatedField) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field._id === id ? updatedField : field))
    );
  };

  const deleteField = (id) => {
    setFields((prevFields) => prevFields.filter((field) => field._id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Management</h1>
        <button
          onClick={addField}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add New Field
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div
            key={field._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{field.name}</h2>
              <div className="flex gap-2">
                <button
                  className="p-1 text-blue-500 hover:text-blue-600"
                  onClick={() =>
                    updateField(field._id, {
                      ...field,
                      name: `${field.name} (Updated)`,
                    })
                  }
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="p-1 text-red-500 hover:text-red-600"
                  onClick={() => deleteField(field._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Crop:</strong> {field.cropType}
              </p>
              <p>
                <strong>Area:</strong> {field.areaSize} hectares
              </p>
              <p>
                <strong>Location:</strong> {field.location.latitude.toFixed(2)},{" "}
                {field.location.longitude.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
