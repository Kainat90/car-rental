import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import * as DocumentService from './document.service'

export const uploadDocument = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { doc_type } = req.body
    const file_url = (req.file as any)?.path

    if (!file_url) {
      res.status(400).json({ message: 'No file uploaded' })
      return
    }

    const doc = await DocumentService.uploadDocument(userId, doc_type, file_url)
    res.status(201).json(doc)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getMyDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const docs = await DocumentService.getMyDocuments(req.user!.id)
    res.json(docs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const docs = await DocumentService.getAllDocuments()
    res.json(docs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const reviewDocument = async (req: AuthRequest, res: Response) => {
  try {
    const docId = parseInt(req.params.id as string)
    const adminId = req.user!.id
    const doc = await DocumentService.reviewDocument(docId, adminId, req.body)
    res.json(doc)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}