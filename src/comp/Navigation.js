import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleButtonClick = (endpoint) => {
    switch (endpoint) {
      case 'ipl':
        navigate('/ipl');
        break;
      case 'worldcup':
        navigate('/worldcup');
        break;
      case 'chat':
        navigate(`/front/${localStorage.getItem('username')}`);
        break;
      case 'stats':
        navigate('/stats');
        break;
      case 'out':
        navigate('/loginRegister');
        break;
      case 'main':
        navigate(`/front1/${localStorage.getItem('username')}`);
        break;
      default:
        break;
    }
  };

  return (
    <header className="header">
      <button onClick={() => handleButtonClick('ipl')}>IPL Points Table</button>
      <button onClick={() => handleButtonClick('worldcup')}>World Cups Points Table</button>
      <button onClick={() => handleButtonClick('chat')}>Chat with AI</button>
      <button onClick={() => handleButtonClick('stats')}>Stats</button>
      <button onClick={() => handleButtonClick('main')}>Go to MAIN PAGE</button>
      <button onClick={() => handleButtonClick('out')}>LOGOUT</button>
    </header>
  );
};

export default Navigation;
