import React from 'react';
import TinderCard from 'react-tinder-card';


const Swiping = ({profiles}) => {

  // const swiped = (direction, nameToDelete) => {
  //   console.log("removing: ${nameToDelete} in direction: ${direction}");
  // };

  // const outOfFrame = (name) => {
  //   console.log(name + " left the screen");
  // }

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen")
  }

  return (
    <div>
      {profiles.map((profile) => (
        <TinderCard 
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen(profile.display_name)} 
        preventSwipe={['right', 'left']}>
          <div className="swipecard-template">
            <h3>{profile.display_name}</h3>
            <span class="swiping-badge">🏭{profile.industry}</span>
            <span class="swiping-badge">🔍{profile.hr_focus}</span>
            <span class="swiping-badge">🏢{profile.company}</span>
            <span class="swiping-badge">💼{profile.position}</span>
          </div>
      </TinderCard>
      ))}
    </div>
  )
};

export default Swiping;