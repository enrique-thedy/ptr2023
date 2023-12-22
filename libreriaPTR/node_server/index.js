"use strict";

const banner = require("node-banner");
const express = require("express");
const fsex = require("fs-extra");
const delay = require("delay");
const fs = require("fs");
const server = express();

let NEXTID = 1000;

banner("Server API", "Para simular accesos a las API de libreriaPTR"); 

const cors = require("cors");

const port = 3030;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

var timeout = null;

var datosFull = {};
var datosSearch = {};
var datosTecnicos = {};
var tiposEvento = {};

fsex.readJson("datos.json",
  "latin1",
  (err, obj) => {
    datosFull = obj;
  });

fsex.readJson("search_result.json",
  "latin1",
  (err, obj) => {
    datosSearch = obj;
  });

fsex.readJson("tecnicos.json",
  //  "latin1",
  (err, obj) =>
  {
    datosTecnicos = obj;
  });

fsex.readJson("tipos_de_evento.json",
  //  "latin1",
  (err, obj) =>
  {
    tiposEvento = obj;
  });

server.get("/api/reportes/path/:clave",
  (req, res) => {
    console.log(req.url);
    console.dir(req.query);

    const clave = req.params.clave;

    console.log(`Retornando path para la clave: ${clave}`);

    res.status(200).send("https://app.powerbi.com/view?r=eyJrIjoiZGRiNmJkOTAtMzNjZS00NmRlLWE0YzktOGE3Y2UwN2NiYzY1IiwidCI6ImUwNzc5ZGVmLWViOTEtNDI0Mi1hZTZhLWYzOTYyYjFhMWI1YSIsImMiOjR9");
  });

server.get("/api/xxx",
  (req, res) => {
    console.log(req.url);
    console.dir(req.query);

    const clave = req.params.clave;
    const usuario = req.params.user;
    const stat = req.params.stat === "true";

    if (stat)
      console.log(`Se incrementara la descarga OK del informe cuya clave es: ${clave} para el usuario ${usuario}`);
    else
      console.log(`Se incrementara la descarga ERROR del informe cuya clave es: ${clave} para el usuario ${usuario}`);

    res.status(200).send("Download agregado");
  });

server.get("/api/libros", (request, response) =>
{
  console.log(request.url);
  console.dir(request.query);

  response.set({
    "Content-Type": "application/json; charset=utf-8",
    "X-Powered-By": "NodeJS"
  });
  response.status(200).send(datosFull);
});

/*
 * Servicios para aplicacion de seguimiento de tecnicos
 */
server.get("/api/tecnicos", (request, response) =>
{
  console.log(request.url);
  console.dir(request.query);

  setTimeout(() =>
  {
    response.set({
      "Content-Type": "application/json; charset=utf-8",
      "X-Powered-By": "NodeJS"
    });
    response.status(200).send(datosTecnicos);
  }, 50);

});

server.get("/api/tipos", (request, response) =>
{
  console.log(request.url);
  console.dir(request.query);

  response.set({
    "Content-Type": "application/json; charset=utf-8",
    "X-Powered-By": "NodeJS"
  });
  response.status(200).send(tiposEvento);
});


server.post("/api/eventos", (request, response) =>
{
  console.log("POST API");
  console.log(request.url);
  console.dir(request.query);
  console.log(request.headers);
  console.log(request.params);
  console.log(request.originalUrl);
  console.log(request.body);
  //  console.log(request);

  NEXTID++;

  response.status(200).send({ id: NEXTID});
});

server.delete("/api/eventos", (request, response) =>
{
  console.log("DELETE API");
  console.log(request.url);
  console.dir(request.query);
  console.log(request.headers);
  console.log(request.params);
  console.log(request.originalUrl);
  console.log(request.body);

  response.status(200).send();
});



/**
 * Emula /api/v2/reportes/lista
 * GetReportesByUsuarioNuevo
 */
server.get("/datos",
  (req, res) => {
    //  console.dir(req, {depth: 1});
    console.log(req.url);
    console.dir(req.query);

    if (Object.keys(req.query).length === 0)
      console.log("Sin query string");

    if (timeout !== null)
      console.log("Ya hay un request...");
    else {
      timeout = setTimeout(() => {
        //
        timeout = null;
        res.set({
          "Content-Type": "application/json; charset=utf-8",
          "X-Powered-By": "NodeJS"
        });
        if (req.query.id === "601540")
          res.status(200).send(data);
        else {
          //  await delay(1000);
          //  res.status(404).send("No se pudo obtener la informacion!!");
          res.status(200).send(datosFull);
        }
      },
        100);
    }
  });

/**
 * Emula /api/v2/reportes/<clave-sector>
 * GetReportesBySector
 */
server.get("/datos/:claveSector",
  (req, res) =>
  {
    const clave = req.params.claveSector;

    //  console.dir(req, {depth: 1});
    console.log(req.url);
    console.dir(req.query);
    console.error("Retornando datos para el sector:", clave);

    if (Object.keys(req.query).length === 0)
      console.log("Sin query string");

    if (timeout !== null)
      console.log("Ya hay un request...");
    else
    {
      timeout = setTimeout(() =>
        {
          //
          timeout = null;
          res.set({
            "Content-Type": "application/json; charset=utf-8",
            "X-Powered-By": "NodeJS"
          });
          if (req.query.id === "601540")
            res.status(200).send(data);
          else
          {
            //  await delay(1000);
            //  res.status(404).send("No se pudo obtener la informacion!!");
            res.status(200).send(datosFull);
          }
        },
        100);
    }
  });


server.get("/:clave",
  (req, res) => {
    const clave = req.params.clave;

    console.log(req.url + " --> " + req.params.clave);
    console.log(req.headers);

    if (clave === "ZIPBIG") {
      if (timeout !== null) {
        console.log("Request pendiente...");
      }
      else {
        timeout = setTimeout(() => {
          res.setHeader("Content-Type", "application/zip");

          fs.access("D:\\Actualiza\\Detalles_Ejecutivo.zip", fs.constants.F_OK, (err) => {
            if (err) {
              console.log("Enviando desde C:\\Informes");
              res.sendFile("C:\\Informes\\Detalles_Ejecutivo.zip");
            }
            else {
              console.log("Enviando desde D:\\Actualiza");
              res.sendFile("D:\\Actualiza\\Detalles_Ejecutivo.zip");
            }
          });
          timeout = null;
        },
          5000);
      }
    }
    else {
      if (clave === "ERROR") {
        res.status(404).send();
      }
      else {
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        fs.access("D:\\Actualiza\\TC2_Campana_OGC.xlsx", fs.constants.F_OK , (err) => {
          if (err) {
            console.log("Enviando desde C:\\Informes");
            res.sendFile("C:\\Informes\\TC2_Campana_OGC.xlsx");
          }
          else {
            console.log("Enviando desde D:\\Actualiza");
            res.sendFile("D:\\Actualiza\\TC2_Campana_OGC.xlsx");
          }
        });
      }
    }
  });

server.get("/files/:filename",
  (req, res) => {
    const filename = req.params.filename;

    console.log(req.url + " --> " + req.params.filename);
    console.log(req.headers);

    if (filename === "Cert_Nac_Crudos.zip1") {
      res.status(404).send();
    }
    else {
      if (timeout !== null) {
        console.log("Request pendiente...");
      }
      else {
        timeout = setTimeout(() => {
          res.setHeader("Content-Type", "application/zip");
          res.setHeader("Content-Disposition", `filename=${filename}`);
          res.sendFile("D:\\ET\\Descargas\\PRUEBAS-CERT\\Cert_Nac_Crudos.zip");
          //  res.sendFile("D:\\Actualiza\\Detalles_Ejecutivo.zip");
          timeout = null;
        },
          500);
      }
    }
  });

server.get("/provincias",
  (req, res) => {
    //  console.dir(req, {depth: 1});
    console.log(req.url);
    console.dir(req.query);

    if (Object.keys(req.query).length === 0)
      console.log("Sin query string");

    if (timeout !== null)
      console.log("Ya hay un request...");
    else {
      timeout = setTimeout(() => {
        //
        timeout = null;
        res.set({
          "Content-Type": "application/json; charset=utf-8",
          "X-Powered-By": "NodeJS"
        });
        if (req.query.id === "601540")
          res.status(200).send(data);
        else {
          //  await delay(1000);
          //  res.status(404).send("No se pudo obtener la informacion!!");
          res.status(200).send(datosFull);
        }
      },
        100);
    }
  });

server.listen(port, () => {
  console.log("Esperando request...");
});

server.get("/", (req, res) => {
  console.log("recibido");
  res.status(500).send("OK");
});

let data1 = "{\"legajo\":601540,\"nombre\":\"Silvia Michia\",\"claims\":[{\"nombre\":\"adspath\",\"valor\":\"LDAP:LDAP://CN=u601540,OU=Usuarios,OU=Amba_Hornos,OU=Edificios, OU=TELECOM,DC=telecom,DC=arg,DC=telecom,DC=com,DC=ar\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"cn\",\"valor\":\"u601540\",\"issuer\":\"AD\"},{\"nombre\":\"department\",\"valor\":\"CERT LITORAL\",\"issuer\":\"AD\"},{\"nombre\":\"displayname\",\"valor\":\"Silvia Michia\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"l\",\"valor\":\"ROSARIO\",\"issuer\":\"AD\"},{\"nombre\":\"mail\",\"valor\":\"SMICHIA@TECO.COM.AR\",\"issuer\":\"AD\"},{\"nombre\":\"middlename\",\"valor\":\"Andrea\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"mobile\",\"valor\":\"3471540289\",\"issuer\":\"AD\"},{\"nombre\":\"othermobile\",\"valor\":\"3471540289\",\"issuer\":\"AD\"},{\"nombre\":\"streetaddress\",\"valor\":\"PARAGUAY 927 \",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"telephonenumber\",\"valor\":\"3414098291\",\"issuer\":\"AD\"},{\"nombre\":\"title\",\"valor\":\"OPERACIONES REGIONALES\",\"issuer\":\"AD\"},{\"nombre\":\"Calle\",\"valor\":\"PARAGUAY927\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Celular\",\"valor\":\"3471540289\",\"issuer\":\"GI\"},{\"nombre\":\"Código Postal\",\"valor\":\"S2000CVS\",\"issuer\":\"GI\"},{\"nombre\":\"Compañia\",\"valor\":\"Telecom Argentina S.A.\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Edificio\",\"valor\":\"ROSARIO CENTRO\",\"issuer\":\"GI\"},{\"nombre\":\"E-mail\",\"valor\":\"SMICHIA@TECO.COM.AR\",\"issuer\":\"GI\"},{\"nombre\":\"Gerencia - Dirección\",\"valor\":\"DESARROLLO DE CONTRATISTAS\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Gerente - Director\",\"valor\":\"DOMECQ JORGELINA LAURA\",\"issuer\":\"GI\"},{\"nombre\":\"Interno\",\"valor\":\"38291\",\"issuer\":\"GI\"},{\"nombre\":\"Legajo\",\"valor\":\"601540\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Líder de Cliente\",\"valor\":\"EPELDE,LUCIA\",\"issuer\":\"GI\"},{\"nombre\":\"Localidad\",\"valor\":\"ROSARIO\",\"issuer\":\"GI\"},{\"nombre\":\"Nombre\",\"valor\":\"SILVIA ANDREA MICHIA\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"País\",\"valor\":\"Argentina\",\"issuer\":\"GI\"},{\"nombre\":\"Piso\",\"valor\":\"PB\",\"issuer\":\"GI\"},{\"nombre\":\"Provincia\",\"valor\":\"Santa Fé\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Teléfono\",\"valor\":\"+5403414098291\",\"issuer\":\"GI\"},{\"nombre\":\"Teléfono Alternativo\",\"valor\":\"\",\"issuer\":\"GI\"}]}";

let data2 = "{\"legajo\":175112,\"nombre\":\"Sandra Jorgelina Capuano\",\"claims\":[{\"nombre\":\"adspath\",\"valor\":\"LDAP:LDAP://CN=u601540,OU=Usuarios,OU=Amba_Hornos,OU=Edificios, OU=TELECOM,DC=telecom,DC=arg,DC=telecom,DC=com,DC=ar\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"cn\",\"valor\":\"u601540\",\"issuer\":\"AD\"},{\"nombre\":\"department\",\"valor\":\"CERT LITORAL\",\"issuer\":\"AD\"},{\"nombre\":\"displayname\",\"valor\":\"Sandra Capuano\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"l\",\"valor\":\"ROSARIO\",\"issuer\":\"AD\"},{\"nombre\":\"mail\",\"valor\":\"SMICHIA@TECO.COM.AR\",\"issuer\":\"AD\"},{\"nombre\":\"middlename\",\"valor\":\"Andrea\",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"mobile\",\"valor\":\"3471540289\",\"issuer\":\"AD\"},{\"nombre\":\"othermobile\",\"valor\":\"3471540289\",\"issuer\":\"AD\"},{\"nombre\":\"streetaddress\",\"valor\":\"PARAGUAY 927 \",\"issuer\":\"AD\"}," +
  "{\"nombre\":\"telephonenumber\",\"valor\":\"3414098291\",\"issuer\":\"AD\"},{\"nombre\":\"title\",\"valor\":\"OPERACIONES REGIONALES\",\"issuer\":\"AD\"},{\"nombre\":\"Calle\",\"valor\":\"PARAGUAY927\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Celular\",\"valor\":\"3471540289\",\"issuer\":\"GI\"},{\"nombre\":\"Código Postal\",\"valor\":\"S2000CVS\",\"issuer\":\"GI\"},{\"nombre\":\"Compañia\",\"valor\":\"Telecom Argentina S.A.\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Edificio\",\"valor\":\"ROSARIO CENTRO\",\"issuer\":\"GI\"},{\"nombre\":\"E-mail\",\"valor\":\"SMICHIA@TECO.COM.AR\",\"issuer\":\"GI\"},{\"nombre\":\"Gerencia - Dirección\",\"valor\":\"DESARROLLO DE CONTRATISTAS\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Gerente - Director\",\"valor\":\"DOMECQ JORGELINA LAURA\",\"issuer\":\"GI\"},{\"nombre\":\"Interno\",\"valor\":\"38291\",\"issuer\":\"GI\"},{\"nombre\":\"Legajo\",\"valor\":\"601540\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Líder de Cliente\",\"valor\":\"EPELDE,LUCIA\",\"issuer\":\"GI\"},{\"nombre\":\"Localidad\",\"valor\":\"ROSARIO\",\"issuer\":\"GI\"},{\"nombre\":\"Nombre\",\"valor\":\"SILVIA ANDREA MICHIA\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"País\",\"valor\":\"Argentina\",\"issuer\":\"GI\"},{\"nombre\":\"Piso\",\"valor\":\"PB\",\"issuer\":\"GI\"},{\"nombre\":\"Provincia\",\"valor\":\"Santa Fé\",\"issuer\":\"GI\"}," +
  "{\"nombre\":\"Teléfono\",\"valor\":\"+5403414098291\",\"issuer\":\"GI\"},{\"nombre\":\"Teléfono Alternativo\",\"valor\":\"\",\"issuer\":\"GI\"}]}";

/*
http.createServer((req, res) => {
    console.log(req.url);

    if (req.method === "POST") {
      res.writeHead(500, {
        "X-Powered-By": "ASP.NET"
      });
      res.end();
    }
    else{
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        //  "Origin": "true",
        "X-Powered-By": "ASP.NET"
      });
      res.end(data);
    }
  }
).listen( port, () => console.log("Esperando request..."));
*/
