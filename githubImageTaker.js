// Esse script serve unicamente para pegar imagens do github e inseri-las no DOM,
// evitando de ter que pegar imagem por imagem na mão

// lista com os nicks do github cujas url de imagens de perfil serão coletadas
const githubUserNames = [
    "YoYolops", "fernandollisboa", "Eduarda-Donato",
    "ielepassos", "lesimoes", "natalia-sa",
    "pedroeoa", "rla4", "ummatias", "soaresmaric",
    "andriellyll", "leleoveiga", "hadrizia", "gabrielhdof"
]

// nicks para imagens secundárias
const gbUserNamesToSmallImages = [
    "0ldProgrammer", "carlmnm", "bruch0",
    "wallacemaxters", "igor-rib-souza", "hereismari",
    "Fabicaneyu", "hkotsubo"
]

// url da api
const baseUrl = "https://api.github.com/users/"

/**
 * Função que coleta url de imagem de perfil do github
 * Função pura
 * 
 * @example getImageUrl("YoYolops") // "https://avatars.githubusercontent.com/u/66336628?v=4"
 * 
 * @param {String} nickname nickname do usuário que terá imagem coletada
 * @returns {String} String source da imagem
 */
async function getImageUrl(nickName) {
    const userUrl = baseUrl + nickName
    const imageUrl = await fetch(userUrl).then(Response => Response.json()).then(obj => obj["avatar_url"])
    return imageUrl
}

/**
 * Função que cria tags <img /> dinamicamente (efeito colateral no DOM, impura)
 * 
 * @param {string[]} nicksList Lista com nomes de usuários
 * @param {String} parentClassName class da tag que será pai das <img />
 * @param {Number} indexToInsertBefore em que posição a tag imagem deve ser inserida
 * @param {boolean | String} addClassName nome de classe a ser inserida na tag img, false para não inserir 
 * @returns {void}
 */
async function imgTagCreator(nicksList,
                             parentClassName,
                             indexToInsertBefore,
                             addClassName) 
{
    let imgsParent = document.getElementsByClassName(parentClassName);

    for(let i = 0; i < imgsParent.length; i++) {
        const srcAttribute = await getImageUrl(nicksList[i])

        let newImage = document.createElement("img")
        newImage.src = srcAttribute
        
        if(addClassName) {
            newImage.className = addClassName
        }

        imgsParent[i].insertBefore(newImage, imgsParent[i].children[indexToInsertBefore])
    }
}

imgTagCreator(githubUserNames, "feed-post", 1, false)
imgTagCreator(gbUserNamesToSmallImages, "post-white-circle", 0, "image-itself")
imgTagCreator(gbUserNamesToSmallImages, "story-ico", 0, false)
imgTagCreator(gbUserNamesToSmallImages, "suggested-profile-left-section", 0, "suggested-profile-pic")


// Notas Importantes:
// imgTagCreator itera sobre a quantidade de tags com a classe informada
// caso o numero de tags pai exceda o valor de usernames disponíveis o programa
// vai quebrar. Ou seja, é um script altamente especializado para a situação específica
// em que foi criado. Nenhuma manipulação é feita no DOM além da criação das img