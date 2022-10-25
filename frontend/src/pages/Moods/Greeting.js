import React from 'react';
import Typewriter from 'typewriter-effect';
import Header from '../../components/Header';

const Greeting = () => {
  // let visited = sessionStorage.getItem('visited');

  // if (visited) {
  //   return <Header title='How do you feel today?' />;
  // }
  // return (
  //   <div>
  //     <Typewriter
  //       onInit={(typewriter) => {
  //         typewriter
  //           .typeString('Hi There...')
  //           .deleteAll(100)
  //           .pauseFor(300)
  //           .typeString('How do you feel today?')
  //           .start();
  //       }}
  //     />
  //   </div>
  // );
  return <Header title='How do you feel today?' />;
};

export default Greeting;
