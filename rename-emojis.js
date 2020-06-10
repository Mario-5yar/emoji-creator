#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const emojiFolder = './emojis'
const outputFolder = './output'
const emojiData = './emoji.json'
let dictionary = JSON.parse(fs.readFileSync(emojiData, 'utf8'))

for (let emoji in dictionary) {

  let code = dictionary[emoji]["unicode"]
  let emojiFile = path.join( emojiFolder, code + ".png" )
  let renamedFile = path.join( outputFolder, emoji + ".png" )
  let alternativeFile = null

  if (dictionary[emoji]["aliases"][0]) {
    alternativeFile = "output/" + dictionary[emoji]["aliases"][0].replace(/:\s*/g, "") + ".png"
  }


  if ( fs.existsSync(emojiFile) ) {
    fs.copyFileSync(emojiFile, renamedFile)
    if (alternativeFile) {
      fs.copyFileSync(emojiFile, alternativeFile)
    }
  }
}