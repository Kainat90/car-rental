import { AppDataSource } from "../config/database";
import {Document, DocStatus} from './entity/document.entity'
import {IReviewDocument} from './document.types'



//Upload document -- file_url comes from Cloudinary via multer middleware
export const uploadDocument = async(
    userId: number,
    doc_type: 'cnic' | 'vehicle_registration',
    file_url: string
)=>{

    const repo = AppDataSource.getRepository(Document)

    //check if user already a pending or approved doc of this type

    const existing = await repo.findOne({

        where: { user_id: userId, doc_type: doc_type as any}
    })

    if(existing && existing.status !== DocStatus.REJECTED){

        throw new Error(`${doc_type} already submitted`)
    }

    const doc = repo.create({
        user_id: userId,
        doc_type:doc_type as any,
        file_url,
        status: DocStatus.PENDING


    })

    return await repo.save(doc)
}


//Get my documents - customer/ vendor sees their own

export const getMyDocuments = async (userId: number)=> {

    const repo = AppDataSource.getRepository(Document)
    return await repo.find({ where:{user_id: userId}})
}


//Get all documents -- super admin only 

export const getAllDocuments = async () => {

    const repo = AppDataSource.getRepository(Document)
    return await repo.find({ relations: {user: true}})
}

// Approve or reject — superadmin only
export const reviewDocument = async (
  docId: number,
  adminId: number,
  data: IReviewDocument
) => {
  const repo = AppDataSource.getRepository(Document)

  const doc = await repo.findOne({ where: { id: docId } })
  if (!doc) throw new Error('Document not found')

  if (doc.status !== DocStatus.PENDING) {
    throw new Error('Document already reviewed')
  }

  doc.status = data.status as DocStatus
  doc.approved_by = adminId

  return await repo.save(doc)
}