import * as fs from "fs";
import { Buffer } from 'buffer';
import * as path from "path";
import { parse } from 'csv-parse';
import express,{Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import logger from "./utils/logger";
import {stringify} from 'csv-stringify';

const app=express();
app.use(express.json());
const prisma = new PrismaClient();

// fs.createReadStream("./files/sample.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))

//   .on("data", async function (row) {
//     // console.log(row);
//     console.log(row[0]);

//     if(row[0].toLowerCase()=='create' || row[0].toLowerCase()=='insert')
//             {
//               try{
//                 const user=await prisma.user.create({
//                   data: {
//                     Name: row[1],
//                     Age: row[2]
//                   },
//                 });
//                 console.log("In try Create/Insert");
//                 logger.info(user);
//                 // console.log(user);
//               }
//               catch (error) {
//                 // throw error;
//                 console.log("In catch Create/Insert");

//                 // console.error(error);
//                 logger.error(error);

//               }
//             // console.log(user);
//             }

//             else if(row[0].toLowerCase()=='update')
//             {
//               try{
//                 const user = await prisma.user.update({
//                   where: { Name: row[1] },
//                   data: { Age: row[2] },
//                 });
//                 console.log("In try Update");
//                 // console.log(user);
//                 logger.info(user);
//               }
//               catch (error) {
//                 // throw error;
//                 console.log("In catch Update");
//                 // console.error(error);
//                 logger.error(error);
//               }
//             }

//             else if(row[0].toLowerCase()=='delete')
//             {
//               try{
//               const post = await prisma.user.delete({
//                 where: {
//                   Name: row[1],
//                 },
//               });

//               console.log("In try delete");
//               // console.log(post);
//               logger.info(post);
//             }
//               catch (error) {
//                 // throw error;
//                 console.log("In catch delete");
//                 // console.error(error);
//                 logger.error(error);
//               }
//             }

//             else
//             {
//               // console.log("Invalid SQL Query");
//               logger.error('Invalid SQL Query !');
//             }
//   })
//   .on("end", function () {
//     console.log("finished");
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });


type WorldCity = {
  Query: string;
  Name: string;
  Age: string;
  // geoNameId: number;
};

let errQueries:WorldCity[]=[];

  const csvFilePath = path.resolve(__dirname, 'files/sample.csv');

  const headers = ['Query','Name','Age'];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, async(error, result:WorldCity[]) => {
    if (error) {
      console.error(error.message);
    }

    console.log("Result");
    console.log(result);
    console.log(result[1]);

    console.log(result.length);

    for (var i = 1; i < result.length; i++) {

      if(result[i].Query.toLowerCase()=='create' || result[i].Query.toLowerCase()=='insert')
        {
          try{
            const user=await prisma.user.create({
              data: {
                Name: result[i].Name,
                Age: result[i].Age
              },
            });
            console.log("In try Create/Insert");
            logger.info(user);
            // console.log(user);
          }
          catch (error) {
            // throw error;
            console.log("In catch Create/Insert");

            errQueries.push(result[i]);

            // console.error(error);
            stringify(errQueries, {
              header: true
            }, function (err, output) {
              fs.writeFileSync(__dirname+'/files/errQueries.csv', output);
            });

            logger.error(error);
          }
        // console.log(user);
        }

        else if(result[i].Query.toLowerCase()=='update')
        {
          try{
            const user = await prisma.user.update({
              where: { Name: result[i].Name },
              data: { Age: result[i].Age },
            });
            console.log("In try Update");
            // console.log(user);
            logger.info(user);
          }
          catch (error) {
            // throw error;
            console.log("In catch Update");

            errQueries.push(result[i]);
            stringify(errQueries, {
              header: true
            }, function (err, output) {
              fs.writeFileSync(__dirname+'/files/errQueries.csv', output);
            });
            // console.error(error);
            logger.error(error);
          }
        }

        else if(result[i].Query.toLowerCase()=='delete')
        {
          try{
          const post = await prisma.user.delete({
            where: {
              Name: result[i].Name,
            },
          });

          console.log("In try delete");
          // console.log(post);
          logger.info(post);
        }
          catch (error) {
            // throw error;
            console.log("In catch delete");
            // console.error(error);
            errQueries.push(result[i]);
            stringify(errQueries, {
              header: true
            }, function (err, output) {
              fs.writeFileSync(__dirname+'/files/errQueries.csv', output);
            });
            logger.error(error);
          }
        }

        else
        {
          // console.log("Invalid SQL Query");
          logger.error('Invalid SQL Query !');
        }

    }
  //   process.exit();
  // logger.end();

  }).on("end", function () {
    console.log("finished reading file");
  });

