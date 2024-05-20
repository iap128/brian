import { PulseLoader } from 'react-spinners';

const LoadingAnswer = () => {
  return (
    <div
      style={{
        padding: '5px 10px',
        borderRadius: '10px',
        marginBottom: '5px',
        backgroundColor: '#e9e9eb',
        alignSelf: 'flex-start',
        width: 'fit-content',
      }}
    >
      <PulseLoader color='white' speedMultiplier={0.75} size={10} />
    </div>
  );
};

export default LoadingAnswer;
