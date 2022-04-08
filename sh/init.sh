#!/bin/bash

function genEnv {
  rm sh/gen$2.sh
  sh sh/gen$1.sh index
  sh sh/genInitEnv.sh $1
}

PS3="Please choose the template language that you want to use:"
select option in "html" "pug"
do
  case $option in
    "html")
      genEnv HTML PUG
      break ;;
    "pug")
      genEnv PUG HTML
      break ;;
    *)
      echo "Please type 1 or 2";;
  esac

  
done

exit


