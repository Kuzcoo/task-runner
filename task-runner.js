'use strict';

const fs = require('fs');
const taskName = getTaskName(process.argv[2]); 

var tasks = {};

module.exports = {
  task,
  src,
  dest,
  watch
};

function task(name, tasksBefore = null, taskCallback = null) {
  tasks[name] = processTaskArgs(tasksBefore, taskCallback);

  if (shouldRunTask(name)) {
    runTask(name);
  } 
}

function src(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf-8');

  return {
    pipe: bindPipe(fileContent)
  }
}

function dest(outputPath) {
  return function (content) {
    fs.writeFileSync(outputPath, content);
  }
}

function watch(filePath, taskName) {
  fs.watch(filePath, {encoding: 'buffer'}, function (eventType, fileName) {
    if (fileName) {
      runTask(taskName);
    }
  });
}

function bindPipe(content) {
  return function (callback) {
    return {
      pipe: bindPipe(callback(content))
    };
  }
}

function runTask(name) {
  if (isArray(tasks[name]['beforeTasks'])) {
    tasks[name].beforeTasks.forEach(taskName => {
      runTask(taskName);
    });
  }

  if (tasks[name]['callback'] 
      && isFunction(tasks[name]['callback'])) {
    tasks[name].callback();
  }
}

function shouldRunTask(name) {
  return require.main !== module &&
         name === taskName
}

function processTaskArgs(tasksBefore, taskCallback) {
  var beforeTasks = null;
  var callback = null;

  if (isArray(tasksBefore)) {
    beforeTasks = tasksBefore;
  }

  if (isString(tasksBefore)) {
    beforeTasks = tasksBefore.split(' ');
  }

  if (isFunction(tasksBefore)) {
    callback = tasksBefore;
  }

  if (taskCallback && isFunction(taskCallback)) {
    callback = taskCallback;
  }

  return {
    beforeTasks,
    callback
  }
}

function getTaskName(arg) {
  if (arg === 'undefined') {
    return 'default';
  }

  return arg;
}

function isArray(element) {
  return element instanceof Array;
}

function isString(element) {
  return typeof element === 'string';
}

function isFunction(element) {
  return typeof element === 'function';
}