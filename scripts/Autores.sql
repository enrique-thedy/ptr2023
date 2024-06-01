use Libreria

/*
  Vamos a dejar espacio para la bio, para la imagen del autor y alguna otra cosa
  que podamos obtener de OpenLibrary, por ejemplo los alias (utiles para busquedas)

  Imagen es la URL a la imagen
*/
create table Autores
(
  ID                uniqueidentifier          not null,
  Nombre            varchar(200)              not null,
  Alias             varchar(500),
  Bio               varchar(5000),
  Imagen            varchar(300),
  --
  constraint PK_Autores primary key (ID),
  constraint UK_Autores_Nombre unique (Nombre)
)
--
----
------

/*
  Sin comentarios...
*/
create table Autores_Libros
(
  ID_Autor      uniqueidentifier      not null,
  ID_Libro      int                   not null,
  --
  constraint PK_Autores_Libros primary key (ID_Autor, ID_Libro),
  constraint FK_Autores_Libros_Autores foreign key (ID_Autor) 
    references Autores (ID),
  constraint FK_Autores_Libros_Libros foreign key (ID_Libro) 
    references Libros (ID)
)
--
----
------

