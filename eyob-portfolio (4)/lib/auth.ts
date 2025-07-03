import { SignJWT, jwtVerify } from "jose"

const getSecretKey = () => new TextEncoder().encode(process.env.JWT_SECRET || "change-this-secret")

type JWTPayload = {
  username: string
  role: "admin"
}

export async function signToken(payload: JWTPayload) {
  const secret = getSecretKey()
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)

  return token
}

export async function verifyToken(token: string) {
  const secret = getSecretKey()
  const { payload } = await jwtVerify<JWTPayload>(token, secret)
  return payload
}
