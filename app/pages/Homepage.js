import React from 'react';

function Homepage() {
  async function handleGetUserAudio(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    console.log(e.target.files[0]);

    data.append('upload_preset', 'audio-uploads');
    data.append('resource_type', 'video');

    const res = await fetch(`https://api.cloudinary.com/v1_1/my-nigerian-projects/video/upload`, {
      method: 'POST',
      body: data,
    });

    const file = await res.json();

    console.log(file.secure_url);
  }
  return (
    <div className="py-5 max-w-6xl mx-auto text-center bg-white">
      <form>
        <input onChange={handleGetUserAudio} type="file" accept="audio/*" />
      </form>
    </div>
  );
}

export default Homepage;
