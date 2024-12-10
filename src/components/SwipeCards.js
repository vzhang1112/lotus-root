import React, {useState} from 'react';
import TinderCard, { displayName } from 'react-tinder-card';

const SwipeCards = ({ profiles }) => {
    const [lastDirection, setLastDirection] = useState('');

    const swiped = (direction, displayName) => {
        console.log('${displayName} swiped ${direction}');
        setLastDirection(direction);
    };

    const outOfFrame = (displayName) => {
        console.log('${displayName} has left the screen');
    };

    return (
        <div className="card-container">
          {profiles.map((profile) => (
            <TinderCard
              key={profile.id}
              onSwipe={(dir) => swiped(dir, profile.name)}
              onCardLeftScreen={() => outOfFrame(profile.name)}
              preventSwipe={['up', 'down']}
            >
              <div className="card" style={{ backgroundImage: `url(${profile.photoUrl})` }}>
                <h3>{profile.name}</h3>
              </div>
            </TinderCard>
          ))}
          {lastDirection && <p>You swiped {lastDirection}</p>}
        </div>
      );
};

export default SwipeCards;