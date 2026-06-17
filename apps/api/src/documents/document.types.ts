export interface IUploadDocument {
  doc_type: 'cnic' | 'vehicle_registration'
}

export interface IReviewDocument {
  status: 'approved' | 'rejected'
}