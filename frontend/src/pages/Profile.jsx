import { useState } from 'react';
import Reputation from '../components/Reputation.jsx';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    reputation: 4.5,
  });

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold mb-6">{user.name}'s Profile</h1>
      <Reputation reputation={user.reputation} />
    </div>
  );
};

export default Profile;
