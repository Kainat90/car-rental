declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number
                email: string
                user_type: string
            }
        }
    }
}

export {}