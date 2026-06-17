import multer from 'multer'

//@ts-ignore
import{CloudinaryStorage} from 'multer-storage-cloudinary'

import cloudinary from '../config/cloudinary'

const storage =  new CloudinaryStorage({

    cloudinary,
    params: async (req:any,file:any)=>({
        folder: 'car-rental/documents',
        allowed_formats: ['jpg','jpeg','png','pdf'],
        public_id: `${Date.now()}-${file.orginalname}`,

    }),
})

export const upload = multer ({storage})