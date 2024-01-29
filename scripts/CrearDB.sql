/*
  Cambiar las rutas correspondientes a los archivos de datos y log!!
*/
use master 

create database Libreria on  primary 
( 
  name = Libreria_Data, 
  filename = 'F:\CURSOS\2023\database\Libreria_Data.mdf', 
  size = 8192kb, 
  maxsize = unlimited, 
  filegrowth = 50%
)
log on 
( 
  name = Libreria_Log, 
  filename = 'F:\CURSOS\2023\database\Libreria_Log.ldf', 
  size = 4096kb, 
  maxsize = 2048gb, 
  filegrowth = 100%
)
collate Modern_Spanish_CI_AI
