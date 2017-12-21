module.exports = transformCase;

function transformCase(opts) {
  const CASE_UPPER = 'upper';
  const CASE_LOWER = 'lower';

  let {caseType} = opts;

  return function (content) {
    switch (caseType) {
      case CASE_UPPER:
        return content.toUpperCase();
      break;

      case CASE_LOWER:
        return content.toLowerCase();
      break;
    }
  };
};