use Libreria

/*
  Editoriales simplemente el nombre por ahora
*/
create drop table Editoriales
(
  ID                    uniqueidentifier          not null,
  Nombre                varchar(150)              not null,
  Comentarios           varchar(1500),
  --  
  constraint PK_Editoriales primary key (ID),
  constraint UK_Editoriales_Nombre unique (Nombre)
)
--
----
------


/*
The relationship from 'DireccionCliente.Usuario' to 'Usuario.Direcciones' with foreign key properties 
{'UsuarioId' : int} cannot target the primary key {'Clave' : Guid} because it is not compatible. Configure a 
principal key or a set of foreign key properties with compatible types for this relationship.

  Sigue casi el formato de Google Books
  Categorias la estoy dejando en una sola cadena pero es un array
  Faltaria agregar las dimensiones (para calcular el costo del envio por ejemplo)
*/
create table Libros
(
  ID                  int             not null          identity,
  Google_ID           varchar(20)     not null,
  Titulo              varchar(200)    not null,
  Subtitulo           varchar(300),
  ISBN                char(13),
  ISBN10              char(10),
  Sintesis            varchar(5000),
  Categorias          varchar(500),
  Idioma              varchar(30),
  Imagen              varchar(300),
  Paginas             int,
  Publicacion         date,
  Reseñas             int,
  Rating              numeric(3, 1),
  Precio              numeric(7, 3),
  Moneda              varchar(10),
  --
  ID_Editorial        uniqueidentifier    not null,   --  un libro DEBE tener una editorial
  --
  constraint PK_Libros primary key (ID),
  constraint UK_GoogleID unique (Google_ID),
  constraint FK_Libros_Editorial foreign key (ID_Editorial) references Editoriales(ID)
)
--
----
------

select * from Editoriales

select * from Libros

select * from Autores

select * from Autores_Libros
where ID_Autor='A5927013-59A5-4EE4-84AE-08DC2B55A954'


/*
delete from Autores_Libros
delete from Libros
delete from Autores
delete from Editoriales

(495 rows affected)

(316 rows affected)

(336 rows affected)

(135 rows affected)

*/

create table GoogleBooksRaw
(
  ID        
)


