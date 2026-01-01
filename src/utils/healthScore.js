// Calculate Project Health Score (0-100)
const calculateHealthScore = (project) => {
  // Placeholder logic - customize based on your requirements
  let score = 100;

  // Example: Reduce score based on recent check-ins and feedback
  // Add your custom logic here

  return Math.max(0, Math.min(100, score)); // Ensure score is between 0-100
};

module.exports = { calculateHealthScore };
