module.exports = {
  // UPLOAD SONG
  getAudioFileURL: async function (e) {
    try {
      const data = new FormData();
      data.append('file', e.target.files[0]);

      data.append('upload_preset', 'audio-uploads');
      data.append('resource_type', 'video');

      const res = await fetch(`https://api.cloudinary.com/v1_1/my-nigerian-projects/upload`, {
        method: 'POST',
        body: data,
      });

      const file = await res.json();

      if (!file.error) {
        return file.secure_url;
      } else {
        console.log(file.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  },
  timeAgo: function (previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24; //86,400,000
    const msPerWeek = msPerDay * 7;

    const elapsed = Date.now() - previous; // DATE.NOW() RETURNS NUMBER OF MILLISECONDS SINCE 1970.

    if (elapsed < msPerMinute - msPerMinute * 0.5) {
      return Math.round(elapsed / 1000) <= 1
        ? ' one second ago'
        : Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour - msPerHour * 0.5) {
      return Math.round(elapsed / msPerMinute) == 1
        ? ' one minute ago'
        : Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay - msPerDay * 0.5) {
      return Math.round(elapsed / msPerHour) == 1
        ? ' one hour ago'
        : Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerWeek - msPerWeek * 0.5) {
      return Math.round(elapsed / msPerDay) == 1
        ? ' one day ago'
        : Math.round(elapsed / msPerDay) + ' days ago';
    } else {
      return Math.round(elapsed / msPerWeek) == 1
        ? ' one week ago'
        : Math.round(elapsed / msPerWeek) + ' weeks ago';
    }
  },
  formatTitleAndDescription: function (s) {
    if (s) {
      const inputToArray = s.split(' ');
      if (inputToArray.length < 6) {
        return `${inputToArray.slice(0, 5).join(' ')}`;
      }
      return `${inputToArray.slice(0, 5).join(' ')}...`;
    }
  },
};
