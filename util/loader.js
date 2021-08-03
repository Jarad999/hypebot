const fs = require("fs");
const Importer = require('mysql-import');

module.exports = {
    async loader(client, Hyperz, config, con) {

        if(config.main.autoImportSQL) {
        // MySQL Auto Importer Lolz
        try {
            const importer = new Importer(config.mysql);

            // New onProgress method, added in version 5.0!
            importer.onProgress(progress=>{
            var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
            console.log(`${percent}% Completed`);
            });
    
            importer.import('./schemas/install.sql').then(()=>{
            var files_imported = importer.getImported();
            console.log(`${files_imported.length} SQL file(s) imported.`);
            }).catch(err=>{
                if(config.main.debugmode) {
                    console.error(err);
                }
            });
        } catch(e) {
            if(config.main.debugmode) {
                console.log(e)
            }
        }
            
        }

    }
}
