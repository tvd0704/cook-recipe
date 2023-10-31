interface CredentialUser {
  userId: string
  email: string
  role: string
  status: string
  phoneNumber: string
  isAdmin?: boolean
}

declare namespace Express {
  export interface Request {
    credential: CredentialUser
  }
}