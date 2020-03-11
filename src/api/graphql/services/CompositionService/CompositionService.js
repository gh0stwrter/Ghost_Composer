import CompositionModel from "../../../models/Compisition/Composition";
import User from "../../../models/User";
import {uploadToDirectory, streamMusicFromCloud} from "../_utils/fileManagement";
import path from "path";
import { createWriteStream, createReadStream ,existsSync} from "fs";

const insertComposition = async (filename,imageName,{ title, userId, price, compo_type, isPublish, category}) =>{

  return await CompositionModel.create({
      composer: userId,
       title, 
       price, 
       isPublish,
       category, 
       file: filename,
       image: imageName,
       compo_type: compo_type,
    })
}

export const createWrittenComposition = async ( { file, writtenInput}) => {
  
  const existingUser = await User.findById(writtenInput.userId);
  await Promise.all(file[0]).then(async  res =>{
    if(existingUser){
      const files = {
        fileOne: res[0],
        fileTwo: res[1]
       }
       const {fileOne, fileTwo} = files;
       const composition =  await insertComposition(fileOne.filename, fileTwo.filename, writtenInput)
       res.map(item =>{
      const typeFile =  path.extname(item.filename).toLowerCase() ===  ".mp3" || ".wav" || ".pdf" || ".jpeg" || ".png" || ".jpg"  ? "compositions" : null 
      uploadToDirectory(item, writtenInput.userId ,typeFile, composition._id)
      return item
    })
  }
     
  })
  
 
}

{/* USER COMPOSITION RELATION */}

export const getAllCompisition = async () => {
 return await CompositionModel.find()
};


export const getAllWrittenCompisitionByUserId = async  (data) => {
    const listCompo = await CompositionModel.find(data)
    console.log(listCompo)
       return listCompo.map((item) =>{
          if(existsSync(dir)) return item;
        })
};


export const streamFile = async ({composer, _id, file}) =>{
      return streamMusicFromCloud(file)
  
}
{/* COMPOSITION RELATION FINISH */}


