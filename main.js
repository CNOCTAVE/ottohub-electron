/* ottohub-electron is an open source ottohub.cn client packed by electron
Copyright (C) 2024-2025  Yu Hongbo, CNOCTAVE

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

const { app, BrowserWindow, Menu, ipcMain, dialog, clipboard, screen, nativeTheme } = require('electron');
const { exec } = require('child_process');
const https = require('https');
const path = require('path');
const fs = require('fs');
const os = require('os');
const axios = require('axios').default;
axios.interceptors.request.use(config => {
    config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.62';
    config.timeout = 15000;
    return config;
}, (error) => {
    return Promise.reject(error);
});

const winston = require('winston');

const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'log.txt',
            level: 'info',
            format: winston.format.simple(),
        }),
    ],
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'ottohub-electron',
        icon: 'logo.png',
        minWidth: 400,
        minHeight: 600,
        resizable: true, // 允许用户调整窗口大小
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    win.loadFile('index.html')
    Menu.setApplicationMenu(null);
};

app.whenReady().then(createWindow)
