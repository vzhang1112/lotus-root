import React, {useState} from 'react';
import TinderCard from 'react-tinder-card';
import { supabase } from '../utils/supabase.ts'

function SwipeCards ({ profiles }) {
  // profiles are passed in from the jsx file that this is implemented in
  /* TODO: 
  based on who's logged in, we know who the swiper is 
  1. project account name from supabase onto displayName used in TinderCard
  2. use that supabase acct info to apply to swipes db
  */ 
    const [lastDirection, setLastDirection] = useState('');

    const retrieveName = (profiles) => {
      
    }

    const swiped = async (direction, displayName) => {
        console.log('${displayName} swiped ${direction}');
        setLastDirection(direction);

      const { data, error } = await supabase
      .from('swipes')
      .insert ([
        { display_name: displayName, 
          direction: direction },
      ]);
      if (error) console.error('Error saving swipe: ', error);
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