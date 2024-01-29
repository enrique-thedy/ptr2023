/*
  CONSULTAS DE SEGURIDAD
*/

use Libreria

select * from Usuarios
--  delete from Usuarios

select * from Perfiles

select * from Usuarios_Perfiles
--  truncate table Usuarios_Perfiles

truncate table Usuarios_Perfiles
delete from Usuarios

--  drop table Usuarios

--  delete from Usuarios where Login='fdsfdsf'

select PER.Nombre, USR.* 
from Usuarios as USR 
  inner join Usuarios_Perfiles as UP on UP.ID_Usuario=USR.Identificador
  inner join Perfiles as PER on UP.ID_Perfil=PER.ID

--  eliminamos user y perfiles que hayamos agregado para test
--
declare @login varchar(50) = 'user'
declare @borrar uniqueidentifier = (select Identificador from Usuarios where login=@login)
delete from Usuarios_Perfiles where ID_Usuario=@borrar
delete from Usuarios where Identificador=@borrar


execute ChequearPassword '70b09100-e5bf-4d75-b4a1-eaae580b127b', '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4'

execute ChequearPassword '80b09100-e5bf-4d75-b4a1-eaae580b127b', '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4'


/*
  Ingresar usuarios a mano...
*/

insert into Usuarios values (
  default,
  '', --  Login
  '', --  Nombre
  1,  --  Tipo Cliente
  '', --  email
  1,  --  mail validado
  1,  --  habilitado
  getdate(),
  '07/10/1925',
  convert(varchar(100), HASHBYTES('SHA2_256', '123'), 2),
  null,
  null
)

declare @nuevoID table ( id uniqueidentifier)

insert into Usuarios 
output inserted.Identificador into @nuevoID
values (
  default,
  'harry', --  Login
  'Harry James Potter', --  Nombre
  1,  --  Tipo Cliente
  'hp@hogwarts.edu.uk', --  email
  1,  --  mail validado
  1,  --  habilitado
  getdate(),
  '1990-07-31',
  convert(varchar(100), HASHBYTES('SHA2_256', 'ginny'), 2),
  null,
  null
)
insert into Usuarios_Perfiles
  select id, 3 from @nuevoID

select * from @nuevoID

select SCOPE_IDENTITY()

delete from Usuarios where Identificador='7DE05366-CB3D-43DB-8654-572CC1824721'
insert into Usuarios_Perfiles ()

select HASHBYTES('SHA2_256', '123')
select convert(varchar(100), HASHBYTES('SHA2_256', '123'), 2)

select * from Usuarios
update Usuarios set Hashed_Password = convert(varchar(100), HASHBYTES('SHA2_256', Hashed_Password), 2)




