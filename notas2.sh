
#!/bin/bash

Direccion=~/Documents/


if [[ $# == 0  ||  ($# == 1 && $1 == "-h") ]]; then
    	echo "Pantalla de ayuda"
elif [ $# == 1 ] && [ $1 == "-v" ]; then
    ls -1 | while read nombre; do
		echo "En la carpeta $nombre hay" $(ls $Direccion"$nombre"|wc -l) "archivo(s)."
	done
else
	var1=${@:2}
    if [ -d $Direccion"$1" ]; then
		if [ -f $Direccion"$1"/"$var1" ]; then
			nano $Direccion"$1"/"$var1"
		else
			touch $Direccion"$1"/"$var1"
            nano $Direccion"$1"/"$var1"
		fi
	else
		mkdir $Direccion"$1"
		touch $Direccion"$1"/"$var1"
		echo Carpeta $1 creada
		nano $Direccion"$1"/"$var1"
	fi
fi