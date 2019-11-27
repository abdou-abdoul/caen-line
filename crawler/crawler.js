let cross = 'https://cors-anywhere.herokuapp.com/'
// ligne -> liste d'arret
data = []
dataString = ""
axios.get(cross + "http://timeo3.keolis.com/relais/147.php?xml=1")
  .then(async function (response) {
    // on parse le contenu xml recupere avec domparser
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(response.data, "text/xml");
    let lignes = xmlDoc.getElementsByTagName("ligne")
    // on recupere la liste des lignes
    for (let i in lignes) {
      if (i % 2 == 0) {
        // on recupere le nom de l'arret
        let name = lignes[i].getElementsByTagName('nom')[0].textContent.trim()
        let code = lignes[i].getElementsByTagName('code')[0].textContent.trim()
        let ligne = { code: code, name: name, arrets: [] }
        // on recupere la liste des arrets pour chaque ligne
        await axios.get(cross + 'http://timeo3.keolis.com/relais/147.php?xml=1&ligne=' + code + '&sens=A')
          .then(res => {
            let xmlDoc2 = parser.parseFromString(res.data, "text/xml")
            let arrets = xmlDoc2.getElementsByTagName("arret")
            for (arret of arrets) {
              arret.getElementsByTagName('nom')[0].textContent
              ligne.arrets.push(arret.getElementsByTagName('nom')[0].textContent.trim())
            }
          })
          .catch(error => { console.log(error) })
        data.push(ligne)
        dataString += JSON.stringify(ligne, null, 1) + "<br>"
      }
    }
    console.log(data)
    document.getElementById("content").innerHTML = "<pre>" + dataString + "<pre/>"
  })
  .catch(error => { console.log(error) })
  