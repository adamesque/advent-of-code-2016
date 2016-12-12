'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const DIR = {
  L: Math.PI / 2,
  R: -Math.PI / 2
}

class Instruction {
  constructor(str) {
    this.turn = str[0];
    this.magnitude = str.slice(1);
  }

  getDirection() {
    return DIR[this.turn];
  }
}

function getFile(file) {
  return fs.readFileAsync('input.txt')
}

function getString(str) {
  return Promise.resolve(str);
}

function parse(data) {
  return data
  .toString()
  .split(', ')
  .map(str => new Instruction(str));
}

function reduce(instructions) {
  let locations = {};
  let revisted;

  let finalDistance = instructions.reduce(([x, y, currDirection], instruction) => {
    let newDirection = currDirection + instruction.getDirection();
    let dx = instruction.magnitude * Math.round(Math.cos(newDirection));
    let dy = instruction.magnitude * Math.round(Math.sin(newDirection));
    let newX = x + dx;
    let newY = y + dy;
    let newCoord = [newX, newY];
    let key = newCoord.join();

    if (locations.hasOwnProperty(key) && !revisted) {
      revisted = newCoord;
    } else {
      locations[key] = true;
    }

    return newCoord.concat(newDirection);
  }, [0, 0, 0]);

  if (revisted) {
    return revisted;
  }
}

function calculate([x, y, direction]) {
  return Math.abs(x) + Math.abs(y);
}

// getFile('input.txt')
getString('R8, R4, R4, R8')
  .then(parse)
  .then(reduce)
  .then(calculate)
  .then(console.log);