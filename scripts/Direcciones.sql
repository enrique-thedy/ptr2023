use Libreria

/*
  VERSION SIN HERENCIA

  Guardamos direcciones de diferente clase en diferentes tablas pero no heredamos
  Podriamos usar Direccion como complex type aunque por ahora no lo haremos
  Que pasa?
  Mirar el ejemplo de amazon, cada direccion de envio tiene por ejemplo instrucciones de despacho,
  horarios, intrucciones...
  Si armamos una jerarquia me parece que es mucha data para tener al menos en un esquema TPH
*/
create table Direcciones_Usuarios
(
  ID                uniqueidentifier          not null,
  Linea_1           varchar(150)              not null,
  Linea_2           varchar(150),
  Codigo_Postal     varchar(20)               not null,
  Localidad         varchar(150)              not null,
  Provincia         varchar(150),
  Pais              varchar(100)              not null,
  --
  ID_Usuario        uniqueidentifier          not null,
  Verificada        bit                       not null default(0),
  --
  constraint PK_Direcciones_Usuarios primary key (ID),
  constraint FK_Direcciones_Usuarios_Usuarios foreign key (ID_Usuario) 
    references Usuarios(Identificador)
)
--
----
------

/*

*/
create table Direcciones_Editoriales
(
  ID                uniqueidentifier          not null,
  Linea_1           varchar(150)              not null,
  Linea_2           varchar(150),
  Codigo_Postal     varchar(20)               not null,
  Localidad         varchar(150)              not null,
  Provincia         varchar(150),
  Pais              varchar(100)              not null,
  --
  ID_Editorial      uniqueidentifier          not null,
  --
  constraint PK_Direcciones_Editoriales primary key (ID),
  constraint FK_Direcciones_Editoriales_Editoriales foreign key (ID_Editorial) 
    references Editoriales(ID)
)
--
----
------

select * from Direcciones_Usuarios



/*
  TPH = Table per hyerarchy

  Contiene tanto direcciones de editoriales como de usuarios
  Podriamos pensar en agregar geolocalizacion como una complex property
*/
create table Direcciones
(
  ID                uniqueidentifier          not null,
  Linea_1           varchar(150)              not null,
  Linea_2           varchar(150),
  Codigo_Postal     varchar(20)               not null,
  Localidad         varchar(150)              not null,
  Provincia         varchar(150),
  Pais              varchar(100)              not null,
  --
  Discriminador     varchar(20)               not null,
  --
  ID_Usuario        uniqueidentifier          null,
  Verificada        bit                       not null default(0),
  --
  ID_Editorial      uniqueidentifier          null,
  --
  constraint PK_Direcciones primary key (ID),
  constraint FK_Direcciones_Usuarios foreign key (ID_Usuario) references Usuarios(Identificador),
  constraint FK_Direcciones_Editoriales foreign key (ID_Editorial) references Editoriales(ID)
)
--
----
------

select * from DireccionesClientes

create table DireccionesClientes
(
  Id              int                 not null      identity  primary key,
  Calle           varchar(200)        not null,
  Ciudad          varchar(200)        not null,
  Pais            varchar(100)        not null,
  ID_Usuario      uniqueidentifier    not null,
  --
  constraint FK_DireccionesClientes_Usuarios foreign key (ID_Usuario)
    references Usuarios(Identificador)
)
