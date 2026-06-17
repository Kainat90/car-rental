import { Router } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'
import { upload } from '../middleware/upload.middleware'
import * as DocumentController from './document.controller'

const router = Router()

// Customer/Vendor uploads their document
router.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  DocumentController.uploadDocument
)

// Customer/Vendor sees their own documents
router.get(
  '/me',
  authMiddleware,
  DocumentController.getMyDocuments
)

// Superadmin sees all documents
router.get(
  '/',
  authMiddleware,
  requireRole('superadmin'),
  DocumentController.getAllDocuments
)

// Superadmin approves or rejects
router.patch(
  '/:id/review',
  authMiddleware,
  requireRole('superadmin'),
  DocumentController.reviewDocument
)

export default router