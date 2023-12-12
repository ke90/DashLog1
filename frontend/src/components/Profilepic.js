import React, { useState } from 'react';


function Profilepic() {
  const imagePath = '/img/kevin-finkler.jpg';

  return (
    <div className="profile-avatar w-50 mb-3">
        <img src={process.env.PUBLIC_URL + imagePath} alt="Profilbild" className="avatar-img" />
    </div>
  );
}

export default Profilepic;