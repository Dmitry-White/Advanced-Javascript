const reports = (() => {
  const createReport = () => {
    const clicks = {};
    const reportAction = (item) => {
      clicks[item] = clicks[item] + 1 || 1;
      console.log(item, clicks);
    };
    return reportAction;
  };
  
  return {
    createReport,
  }
})();