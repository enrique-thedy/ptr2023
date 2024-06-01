/*
  DEFINICION DE ENTIDADES RELACIONADAS CON LA SEGURIDAD
  - LOGIN
  - REGISTRO
  - AUTENTICACION
  - AUTORIZACION
  - CLAIMS
*/

use Libreria

/*
  Perfiles van a ser los posibler roles que un usuario puede tener dentro de la aplicacion
  En general, podemos tener varios perfiles por usuario
*/
create table Perfiles
(
  ID              int           not null      identity,
  Nombre          varchar(50)   not null,
  Tipo_Usuario    int           not null,
  Descripcion     varchar(400),
  --
  constraint PK_Perfiles primary key (ID)
)
--
----
------

insert into Perfiles values ('Administrador', 0, 'Acceso a todas las opciones, modificar y agregar cualquier entidad')
insert into Perfiles values ('StockAdmin', 0, 'Puede modificar cualquier aspecto del Catalogo de libros')
insert into Perfiles values ('Visitante', 1, 'Visualizar productos, armar carritos. No tiene aun un medio de pago ni realizo una transaccion')
insert into Perfiles values ('Comprador', 1, 'Los permisos del nivel Visitante, pero alguna vez compro y/o asocio un medio de pago')
insert into Perfiles values ('Contabilidad', 0, 'Puede visualizar y cambiar datos de ventas, stock y otras areas de contabilidad')



/*
  Tipo_Usuario
  - Empleado = 0
  - Cliente = 1
  - ...

  Cambio nombre de ID -->  a para poder usar el mapeo de HasKey en EF
  Email_Valido --> la primera vez que ingresa tiene q validar el correo (no aplica si es empleado)
  Habilitado --> podria estar en false si hay muchos reintentos...si intenta recuperar contraseña...
  Hashed_Password --> la dejamos en null porque no va a tener mapeo en el modelo de dominio

  drop table Usuarios
*/
create table Usuarios
(
  Identificador       uniqueidentifier    not null    default newid(),
  Login               varchar(25)         not null,
  --
  Nombre              varchar(200)        not null,
  Tipo_Usuario        int                 not null    default(1),   --  default cliente
  Email               varchar(50)         not null,
  Email_Valido        bit                 not null    default(0),
  Habilitado          bit                 not null    default(0),
  Fecha_Alta          smalldatetime       not null,
  Fecha_Nacimiento    date                not null,
  Hashed_Password     varchar(100),
  Imagen              image,
  Ultimo_Ingreso      smalldatetime,
  --
  constraint PK_Usuarios primary key (Identificador),
  constraint UK_Usuarios_Login unique (Login),
  constraint UK_Usuarios_Email unique (Email)
)
--
----
------

/*
  Creamos la join table para Usuarios *----* Perfiles 

  drop table Usuarios_Perfiles
*/

create table Usuarios_Perfiles
(
  ID_Usuario      uniqueidentifier    not null,
  ID_Perfil       int                 not null,
  --
  constraint PK_Usuarios_Perfiles primary key (ID_Usuario, ID_Perfil),
  constraint FK_Usuarios_Perfiles_Usuarios
    foreign key (ID_Usuario) references Usuarios (Identificador),
  constraint FK_Usuarios_Perfiles_Perfiles 
    foreign key (ID_Perfil) references Perfiles(ID)
)
--
----
------

/*
*/
create table EmailVerifications
(
  ID                  uniqueidentifier          not null    default(newid()),
  EmailVerificado     varchar(50)               not null,
  Expira              date                      not null,
  --
  constraint PK_EmailVerifications primary key (ID),
  constraint FK_EmailVerifications_Usuarios foreign key (EmailVerificado)
    references Usuarios(Email)
)
--
----
------

/*
  Procedimiento para ejecutar el cambio de password del usuario sin necesidad de update
  en el cliente
  Evitamos transferir la contraseña a memoria

  Tambien podriamos hacerlo sin el stored, mientras lo ejecutemos con ExecutInterpolatedSql
*/
create or alter procedure CambiarPassword
  @login varchar(25), @pass varchar(100)
as begin
  update Usuarios set Hashed_Password = @pass where [Login]=@login
end
--
----
------

/*
  Una alternativa para validar la password (siempre en el DB server) es usar un stored
*/
create or alter procedure ChequearPassword
  @uid varchar(36), @pass varchar(100)
as begin
  if exists(select Identificador from Usuarios where Identificador=@uid and UPPER(Hashed_Password)=upper(@pass)) begin
    select 'OK'
    --return 1
  end 
  else begin
    select 'ERROR'
    --return 0
  end
end
--
----
------

