const express = require('express');
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

let app = express();


app.get('/services/reportes', async () => {

    console.log("Entra PDF : ", path.resolve( __dirname ) + '/prueba.html');

    var dataBinding = {
        items: [{
                name: "item 1",
                price: 100
            },
            {
                name: "item 2",
                price: 200
            },
            {
                name: "item 3",
                price: 300
            }
        ],
        total: 600,
        isWatermark: true
    }
    
    let rutaDoctoHtml = path.resolve( __dirname );
    let rutaSalidaPdf = path.resolve( __dirname ) + '/pruebaPdf.pdf';
    // var templateHtml = fs.readFileSync(path.join(process.cwd(), rutaDoctoHtml), 'utf8');
    var templateHtml = fs.readFileSync(path.join(rutaDoctoHtml, 'prueba.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var finalHtml = template(dataBinding);
    var options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: rutaSalidaPdf
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html,${finalHtml}`, {
        waitUntil: 'networkidle0'
    });
    await page.pdf(options);
    await browser.close();

    console.log("Hecho");

});

module.exports = app;

