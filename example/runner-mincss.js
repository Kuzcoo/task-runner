module.exports = minifyCss;

function minifyCss(opts = {}) {
  let {stats} = opts;

  return function (content) {
    let initialLen = content.length;
    let minifiedContent = content.replace(/\s+/g, '');

    if (stats) {
      console.log('===============================');
      console.log('initial file length (in bytes): ' + initialLen);
      console.log('minified file length: ' + minifiedContent.length);
      console.log('total length saved: ' + (initialLen - minifiedContent.length));
      console.log('% saved: ' + (100 - (minifiedContent.length/initialLen*100)));
      console.log('===============================');
    }

    return minifiedContent;
  };
};