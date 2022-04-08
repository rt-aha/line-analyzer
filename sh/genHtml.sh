templateString='
<!DOCTYPE html>\n
<html lang="en">\n
\t<head>\n
\t\t<meta charset="UTF-8">\n
\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n
\t\t<title>Document</title>\n
\t</head>\n
\t<body>\n
\t</body>\n
</html>\n
'

echo "----- Start generate .html template"

# 沒有參數直接離開
if [ "$#" = "0" ]
then
  echo "-WARN: please enter at least a argument"
  echo "EXIT"
  exit
fi


for arg in $@
  do
  isExist=f
  for dir in $(ls ./src/js)  
    do
      filename="${dir%.*}"

      if [ "$arg" = "$filename" ]
      then
        
        isExist=t
      fi
    done

  if [ "$isExist" = "f" ]
  then

    jsTemplateString="
    import '@/template/$arg.html';\n
    import '@/styles/preset/index.scss';\n
    import '@/styles/$arg.scss';\n
    "

    echo $templateString >> src/template/$arg.html
    echo $jsTemplateString >> src/js/$arg.js
    touch src/styles/${arg}.scss
    echo "-INFO: create $arg.html, $arg.scss, $arg.js success!"
  else
    echo "-WARN: $arg is already existed, please check it"
  fi

  done

echo "-----  FINISHED\n"
