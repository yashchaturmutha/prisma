// import { readFile, promises as fsPromises } from 'fs';
import * as fs from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import logger from "./utils/logger";
import {stringify} from 'csv-stringify';

const prisma = new PrismaClient();

var file = fs.createWriteStream('./files/errQueries.txt');
let errQueries:string[]=[];

async function asyncReadFile(filename: string) {
    try {
    //   const fileContent = await fsPromises.readFile(
    //     join(__dirname, filename),
    //     'utf-8',
    //   );
    const fileContent = fs.readFileSync(__dirname+filename, { encoding: 'utf-8' });

    var arr = fileContent.toString().split("\n");
    console.log(arr);

    for (let x = 0; x < arr.length; x++) {
    console.log(`Line:${x} `, arr[x]);

    const Query=arr[x].substring(0,arr[x].indexOf(' '));
    console.log(Query);

    if(Query.toLowerCase()=='create' || Query.toLowerCase()=='insert')
    {
      try{
        console.log("In try Create/Insert");

        const Name=arr[x].substring(arr[x].indexOf("Age")+7,arr[x].lastIndexOf(',')-1);
        const Age=arr[x].substring(arr[x].lastIndexOf(',')+1,arr[x].lastIndexOf(')'));

        console.log(Name);
        console.log(Age);

        const user=await prisma.user.create({
          data: {
            Name: Name,
            Age: Age
          },
        });

        logger.info(user);
    //     // fs.writeFileSync(__dirname+'/files/errQueries.csv', '');
        console.log(user);
      }
      catch (error) {
        // throw error;
        console.log("In catch Create/Insert");

        errQueries.push(arr[x]);
        console.log(arr[x]);

        // console.error(error);
        console.log(errQueries);

        // file.on('error', function(err) { /* error handling */ });
        // errQueries.forEach(function(v) { file.write(v + '\n'); });
        file.write('');
        file.write(arr[x] + '\n');
        // file.end();

        logger.error(error);
      }
    }

    else if(Query.toLowerCase()=='update')
        {
          try{
            console.log("In try Update");
            const Name=arr[x].substring(arr[x].lastIndexOf("=")+2,arr[x].lastIndexOf("'"));
            const Age=arr[x].substring(arr[x].indexOf('=')+1,arr[x].indexOf('WHERE')-1);

            console.log(Name);
            console.log(Age);

            const user = await prisma.user.update({
              where: { Name: Name },
              data: { Age: Age },
            });

            console.log(user);
            logger.info(user);
          }
          catch (error) {
            // throw error;
            console.log("In catch Update");

            errQueries.push(arr[x]);
            console.log(arr[x]);
            console.log(errQueries);

            // errQueries.forEach(function(v) { file.write(v + '\n'); });
            file.write(arr[x] + '\n');
            // console.error(error);
            logger.error(error);
          }
        }

        else if(Query.toLowerCase()=='delete')
        {
          try{
            console.log("In try delete");
            const Name=arr[x].substring(arr[x].indexOf("=")+2,arr[x].lastIndexOf("'"));
            console.log(Name);

            const post = await prisma.user.delete({
                where: {
                Name: Name,
                },
            });
            console.log(post);
            logger.info(post);
        }
          catch (error) {
            // throw error;
            console.log("In catch delete");
            // console.error(error);
            errQueries.push(arr[x]);
            console.log(arr[x]);
            console.log(errQueries);

            // errQueries.forEach(function(v) { file.write(v + '\n'); });
            file.write(arr[x] + '\n');

            logger.error(error);
          }
        }

        // else if(Query.toLowerCase()=='alter')
        // {
        //   try{
        //     console.log("In try delete");
        //     const Name=arr[x].substring(arr[x].indexOf("=")+2,arr[x].lastIndexOf("'"));
        //     console.log(Name);

        //     const post = await prisma.user.delete({
        //         where: {
        //         Name: Name,
        //         },
        //     });
        //     console.log(post);
        //     logger.info(post);
        // }
        //   catch (error) {
        //     // throw error;
        //     console.log("In catch delete");
        //     // console.error(error);
        //     errQueries.push(arr[x]);
        //     console.log(arr[x]);
        //     console.log(errQueries);

        //     // errQueries.forEach(function(v) { file.write(v + '\n'); });
        //     file.write(arr[x] + '\n');

        //     logger.error(error);
        //   }
        // }

        else {
        errQueries.push(arr[x]);
        console.log(arr[x]);
        console.log(errQueries);

        console.log("Invalid SQL Query");
        // file.on('error', function(err) { /* error handling */ });
        // errQueries.forEach(function(v) { file.write(v + '\n'); });
        file.write(arr[x] + '\n');
        logger.error("Invalid SQL Query");
        // file.end();
    }
    //     // Do something here...
    }
    //   console.log(fileContent); // 👉️ "hello world hello world ..."

    return fileContent;

    } catch (err) {
    //   console.log(err);
      return 'Something went wrong'
    // return err;
    }
  }

  console.log(asyncReadFile('/files/sqlQueries.txt'));