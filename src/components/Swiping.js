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
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <h3>{profile.display_name}</h3>
            <p>Industry: {profile.industry}</p>
            <p>HR Focus: {profile.hr_focus}</p>
            <p>Company: {profile.company}</p>
            <p>Position: {profile.position}</p>
          </div>
      </TinderCard>
      ))}
    </div>
  )
};

export default Swiping;




// const Swiping = ({ profiles }) => {
//     const swiped = (direction, nameToDelete) => {
//         console.log(`removing: ${nameToDelete} in direction: ${direction}`);
//     };

//     const outOfFrame = (name) => {
//         console.log(name + ' left the screen!');
//     };

//     return (
//         <div>
//             {profiles.map((profile) => (
//                 <TinderCard
//                     key={profile.id}
//                     onSwipe={(dir) => swiped(dir, profile.display_name)}
//                     onCardLeftScreen={() => outOfFrame(profile.display_name)}
//                 >
//                     <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
//                         <h3>{profile.display_name}</h3>
//                         <p>Industry: {profile.industry}</p>
//                         <p>HR Focus: {profile.hr_focus}</p>
//                         <p>Company: {profile.company}</p>
//                         <p>Position: {profile.position}</p>
//                     </div>
//                 </TinderCard>
//             ))}
//         </div>
//     );
// };

// export default Swiping;