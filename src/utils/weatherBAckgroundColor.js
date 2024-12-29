const backgroundcolor = value => {
  switch (value.trim().toLowerCase()) {
    case 'sunny':
      return {backgroundColor: '#FFEB3B'};

    case 'cloudy':
      return {backgroundColor: '#90A4AE'};
    case 'overcast':
      return {backgroundColor: '#607D8B'};
    case 'rainy':
      return {backgroundColor: '#1E88E5'};
    case 'stormy':
      return {backgroundColor: '#263238'};
    case 'snowy':
      return {backgroundColor: '#B0BEC5'};
    case 'foggy':
      return {backgroundColor: '#B0BEC5'};
    case 'windy':
      return {backgroundColor: '#4CAF50'};
    default:
      return {backgroundColor: '#1E88E5'};
  }
};

export default backgroundcolor;
