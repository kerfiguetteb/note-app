/**Ecrire une application de notes en Node.js.
Les notes seront stockées dans un fichier data.json

node app.js
- `list` = Affiche les titres de toutes les notes
- `add --title="Ma note" -message="Contenu de ma note"` = Ajoute une note. Le titre doit être requis

- `remove --title="Ma note": Supprime la note qui a pour titre "Ma note"
- `read --title="Ma note"` = Affiche le titre et message de cette note en particulier

BONUS: gérer le remove et le read (le add aussi) avec les id */




const yargs = require('yargs');
const fs = require('fs');
const prompt = require("prompt");
const { command } = require('yargs');
const { argv } = require('process');




yargs.command({
    // node exo.js list
    command: 'list',
    describe: 'liste des notes',

    handler:() =>{
        const MyNotesJSON = `[
            {   "id":1,
                "title": "Français",
                "message": "lorem ipsum baz fou"
            },
        
            {
                "id":2,
                "title": "Math",
                "message": "lorem ipsum baz fou"
        
            },
        
            {
                "id":3,
                "title": "Anglais",
                "message": "lorem ipsum baz fou"
        
            }
        ]`;
        
        
        fs.writeFile("data.json",MyNotesJSON,(err)=>{
            if(err) console.log(err);
            else{
            }
        });
        
        fs.readFile('data.json','utf-8', (err, data) => {
            if(err) console.log(err);
            else {
                const MynoteJS = JSON.parse(data)
                console.log(MynoteJS);

                MynoteJS.forEach(note => {
                    console.log(` ${note.title}`);
                })
            }
        })
        
        
        console.log('Liste des notes');}

    

        
    }).command({
    //node exo.js add --id="1" --title="Bonjour JB"
    command: 'add',
    describe: 'Ajoute une note ',
    builder: {
        id:{
            describe:"Numero de ma note",
            demandOption:true,
            type:"number"
        },
        title: {
            describe: "Titre de ma note",
            demandOption: true,
            type: "string"
        },
        message: {
            describe: "Contenu de la note",
            demandOption: false,
            type: "string"
        }
    },
    
    handler: (argv) => {
        
        fs.readFile ('data.json', 'utf-8', (err,datastr)=>{
            
            console.log(datastr);
            
            const Note = JSON.parse(datastr);
            console.log(Note);
            
            const NewNotes = 
            {  id:argv.id,
                title: argv.title,
                message: argv.message
            }
            
            Note.push(NewNotes)
            console.log(NewNotes)
            
            const NotesJSON = JSON.stringify(Note);
            console.log(NotesJSON);
            
            fs.writeFile("data.json",NotesJSON,(err) => {
                if(err) console.log(err);
                else {
                    console.log("La note a été ajoutée");
                }
            });
        })
        ;}


}).command({
    // node exo.js remove
    command: 'remove',
    describe: "Supprime une note",
    builder : {
        id:{
            describe:"Numero de ma note",
            demandOption:false,
            type:"number"
        },
        title: {
            describe: "Titre de ma note",
            demandOption: false,
            type: "string"
        },
        message: {
            describe: "Contenu de la note",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
        prompt.get(['id'],(err, result) => {
            if(err) {
                console.log("Y a un blem!");
            }
            
            else { 
                 fs.readFile('data.json', 'utf-8',(err,data)=>{
                    const Note = JSON.parse(data);
                   
                    Note.splice(result.id,1)
                    console.log(`la note ${result.id} a été supprimé`);
                    console.log(Note);

                    const NotesJSON = JSON.stringify(Note);

                    fs.writeFile("data.json",NotesJSON,(err) => {
                        if(err) console.log(err);
                        else {
                            
                        }
                    });
          
        });
        
        
    }
})   
       
    }

}).command({
    // node exo.js read
    command: 'read',
    describe: "Affiche le détail d'une note",
    builder:{
        id:{
            describe:"Numero de ma note",
            demandOption:false,
            type:"number"
        },
        title: {
            describe: "Titre de ma note",
            demandOption: false,
            type: "string"
        },
        message: {
            describe: "Contenu de la note",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
      
       
                prompt.get(['id'],(err, result) => {
                    if(err) {
                        console.log("Y a un blem!");
                    }
                    
                    else { 
                         fs.readFile('data.json', 'utf-8',(err,data)=>{
                            const Note = JSON.parse(data);
                            console.log(Note[result.id]);
                  
                });
                
                
            }
        })    
       
    }
}).argv;

