module.exports = {
  timeAgo: function (previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24; //86,400,000
    var msPerWeek = msPerDay * 7;

    var elapsed = Date.now() - previous; // DATE.NOW() RETURNS NUMBER OF MILLISECONDS SINCE 1970.

    elapsed = 584800000;

    console.log(elapsed, Math.round(elapsed / msPerDay));

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour - msPerHour * 0.5) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay - msPerDay * 0.5) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
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
