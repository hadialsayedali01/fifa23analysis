dialogDict = {
        numPlayersTeamsNations:[
            `<pre>
                SELECT 
                count(*) 'Number of Players', 
                count(DISTINCT club) 'Number of Teams',
                count(DISTINCT nationality) 'Number of Nations'
                FROM players;
            <pre>`,
            `<table border="1"><tbody><tr><td bgcolor="silver" class="medium">Number of Players</td><td bgcolor="silver" class="medium">Number of Teams</td><td bgcolor="silver" class="medium">Number of Nations</td></tr><tr><td class="normal" valign="top">16170</td><td class="normal" valign="top">874</td><td class="normal" valign="top">155</td></tr></tbody></table>`
        ],
        avgModeRating:[
            `
            <pre>
            SELECT 
            avg(overall) 'Average of Rating',
            (SELECT overall FROM players GROUP BY overall ORDER BY count(*) DESC LIMIT 1) 'Mode of Rating'
            FROM players;
            </pre>
            `,
            `<table border="1"><tbody><tr><td bgcolor="silver" class="medium">Average of Rating</td><td bgcolor="silver" class="medium">Mode of Rating</td></tr><tr><td class="normal" valign="top">63.6085</td><td class="normal" valign="top">60</td></tr></tbody></table>`
    
        ],
        nationsValue:[
            `<pre>
                SELECT nationality, round(avg(value),2) 'Average Value'
                FROM players
                GROUP BY nationality
                HAVING count(*)>350
                ORDER BY 2 DESC
                LIMIT 5;
            </pre>
            `,
            '<table border="1"><tbody><tr><td bgcolor="silver" class="medium">nationality</td><td bgcolor="silver" class="medium">Average Value</td></tr><tr><td class="normal" valign="top">Brazil</td><td class="normal" valign="top">7519782.16</td></tr><tr><td class="normal" valign="top">France</td><td class="normal" valign="top">5510356.22</td></tr><tr><td class="normal" valign="top">Spain</td><td class="normal" valign="top">5148150.22</td></tr><tr><td class="normal" valign="top">Italy</td><td class="normal" valign="top">482225</td></tr></tbody></table>'
            
        ],
        nationsRating:[
            `
            <pre>
                SELECT nationality, avg(overall) 'Average Rating'
                FROM players
                GROUP BY nationality
                HAVING count(*)>350
                ORDER BY 2 DESC
                LIMIT 5;
            </pre>
            `
            ,
            `<table border="1"><tbody><tr><td bgcolor="silver" class="medium">nationality</td><td bgcolor="silver" class="medium">Average Rating</td></tr><tr><td class="normal" valign="top">Brazil</td><td class="normal" valign="top">70.5643</td></tr><tr><td class="normal" valign="top">Spain</td><td class="normal" valign="top">67.7848</td></tr><tr><td class="normal" valign="top">Italy</td><td class="normal" valign="top">67.0000</td></tr><tr><td class="normal" valign="top">Argentina</td><td class="normal" valign="top">66.9111</td></tr><tr><td class="normal" valign="top">France</td><td class="normal" valign="top">66.3122</td></tr></tbody></table>`
        ], 
    }
    dialogGeneral = document.createElement("dialog")
    closeDialog = document.createElement("button")
    closeDialog.textContent="Close"
    closeDialog.addEventListener("click",(event)=>{
        event.preventDefault()
        dialogGeneral.close()
    })

    dialogGeneral.appendChild(closeDialog)
    document.getElementsByTagName("html")[0].appendChild(dialogGeneral);
    
    document.getElementById("numPlayersTeamsNations").addEventListener("click",()=>{
        dialogGeneral.innerHTML=dialogDict.numPlayersTeamsNations[0]+dialogDict.numPlayersTeamsNations[1]
        dialogGeneral.appendChild(closeDialog);
        dialogGeneral.showModal();
    });

    document.getElementById("avgModeRating").addEventListener("click",()=>{
        dialogGeneral.innerHTML=dialogDict.avgModeRating[0]+dialogDict.avgModeRating[1]
        dialogGeneral.appendChild(closeDialog);
        dialogGeneral.showModal();
    })

    document.getElementById("nationsRating").addEventListener("click",()=>{
        dialogGeneral.innerHTML=dialogDict.nationsRating[0]+dialogDict.nationsRating[1]
        dialogGeneral.appendChild(closeDialog);
        dialogGeneral.showModal();
    })

    document.getElementById("nationsValue").addEventListener("click",()=>{
        dialogGeneral.innerHTML=dialogDict.nationsValue[0]+dialogDict.nationsValue[1]
        dialogGeneral.appendChild(closeDialog);
        dialogGeneral.showModal();
    })
